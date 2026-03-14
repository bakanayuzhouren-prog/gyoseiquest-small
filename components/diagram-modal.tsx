import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedText } from '@/components/themed-text';
import { generateDiagramMermaid } from '@/src/utils/geminiService';

const GEMINI_API_KEY =
  (typeof Constants?.expoConfig?.extra !== 'undefined' &&
    (Constants.expoConfig.extra as any)?.geminiApiKey) ||
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_GEMINI_API_KEY) ||
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
  '';

type DiagramMode = 'self' | 'model';

type NodePosition = { x: number; y: number };
type Arrow = { from: string; to: string; label?: string; labelX?: number; labelY?: number };

const DEFAULT_NODES = ['A', 'B', 'C', 'D'];
const NODE_SIZE = 44;
const ARROWHEAD_SIZE = 10;
const SAVED_DIAGRAM_PREFIX = 'saved_diagram_';
const SELF_DIAGRAM_PREFIX = 'self_diagram_';

function hashProblemText(text: string): string {
  let h = 0;
  const s = text.slice(0, 2000);
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h = h & h;
  }
  return SAVED_DIAGRAM_PREFIX + Math.abs(h).toString(36);
}

function selfDiagramKey(problemText: string): string {
  const h = hashProblemText(problemText).replace(SAVED_DIAGRAM_PREFIX, '');
  return SELF_DIAGRAM_PREFIX + h;
}

export type SavedDiagram = { arrows: Arrow[]; labels: Record<string, string> };

export function DiagramModal({
  visible,
  onClose,
  problemText,
  mode,
  questionId,
}: {
  visible: boolean;
  onClose: () => void;
  problemText: string;
  mode: DiagramMode;
  questionId?: string;
}) {
  const [modelMermaid, setModelMermaid] = useState('');
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, NodePosition>>(() => {
    const pos: Record<string, NodePosition> = {};
    DEFAULT_NODES.forEach((id, i) => {
      pos[id] = { x: 0, y: 0 };
    });
    return pos;
  });
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [arrowFrom, setArrowFrom] = useState<string | null>(null);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [editingLabelFor, setEditingLabelFor] = useState<string | null>(null);
  const [editingArrowIndex, setEditingArrowIndex] = useState<number | null>(null);
  const [savedDiagram, setSavedDiagram] = useState<SavedDiagram | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const storageKey = hashProblemText(problemText);
  const selfKey = questionId ? SELF_DIAGRAM_PREFIX + questionId : selfDiagramKey(problemText);
  const selfLoadedRef = useRef(false);
  const selfKeyWhenOpenedRef = useRef<string | null>(null);

  const loadSelfDiagram = useCallback(async () => {
    selfLoadedRef.current = false;
    selfKeyWhenOpenedRef.current = selfKey;
    try {
      const raw = await AsyncStorage.getItem(selfKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { arrows?: Arrow[]; labels?: Record<string, string> };
        if (parsed?.arrows && Array.isArray(parsed.arrows) && parsed?.labels && typeof parsed.labels === 'object') {
          setArrows(parsed.arrows);
          setLabels(parsed.labels);
          selfLoadedRef.current = true;
          return;
        }
      }
    } catch (_) {}
    setArrows([]);
    setLabels({});
    selfLoadedRef.current = true;
  }, [selfKey]);

  const saveSelfDiagram = useCallback(
    async (data: { arrows: Arrow[]; labels: Record<string, string> }, key?: string) => {
      const k = key ?? selfKeyWhenOpenedRef.current ?? selfKey;
      try {
        await AsyncStorage.setItem(k, JSON.stringify(data));
      } catch (_) {}
    },
    [selfKey]
  );

  const loadSavedDiagram = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedDiagram;
        if (parsed?.arrows && Array.isArray(parsed.arrows) && parsed?.labels && typeof parsed.labels === 'object') {
          setSavedDiagram(parsed);
          return true;
        }
      }
    } catch (_) {}
    setSavedDiagram(null);
    return false;
  }, [storageKey]);

  const updateArrow = useCallback((index: number, updates: Partial<Arrow>) => {
    setArrows((prev) => prev.map((a, i) => (i === index ? { ...a, ...updates } : a)));
  }, []);

  const saveAsModel = useCallback(async () => {
    const data: SavedDiagram = { arrows: arrows.map(({ from, to, label, labelX, labelY }) => ({ from, to, label, labelX, labelY })), labels: { ...labels } };
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      setSaveToast('模範図として保存しました');
      setTimeout(() => setSaveToast(null), 2000);
    } catch (e: any) {
      setSaveToast('保存に失敗: ' + (e?.message ?? ''));
    }
  }, [storageKey, arrows, labels]);

  const requestModelDiagram = useCallback(async () => {
    if (!GEMINI_API_KEY) {
      setModelError('APIキー未設定');
      return;
    }
    setModelError(null);
    setModelMermaid('');
    setModelLoading(true);
    try {
      const result = await generateDiagramMermaid(GEMINI_API_KEY, { problemText });
      setModelMermaid(result);
    } catch (e: any) {
      setModelError(e?.message || '図の生成に失敗しました');
    } finally {
      setModelLoading(false);
    }
  }, [problemText]);

  useEffect(() => {
    if (visible && mode === 'model') {
      setSavedDiagram(null);
      setModelMermaid('');
      loadSavedDiagram().then((hasSaved) => {
        if (!hasSaved) requestModelDiagram();
      });
    }
  }, [visible, mode, loadSavedDiagram, requestModelDiagram]);

  useEffect(() => {
    if (visible && mode === 'self') {
      loadSelfDiagram();
    }
  }, [visible, mode, loadSelfDiagram]);

  useEffect(() => {
    if (!visible) {
      if (selfLoadedRef.current && selfKeyWhenOpenedRef.current) {
        saveSelfDiagram({ arrows, labels }, selfKeyWhenOpenedRef.current);
      }
      selfKeyWhenOpenedRef.current = null;
      setArrowFrom(null);
      setEditingLabelFor(null);
      setEditingArrowIndex(null);
    }
  }, [visible, saveSelfDiagram, arrows, labels]);

  const handleClear = useCallback(() => {
    const k = selfKeyWhenOpenedRef.current ?? selfKey;
    setArrows([]);
    setLabels({});
    saveSelfDiagram({ arrows: [], labels: {} }, k);
  }, [saveSelfDiagram, selfKey]);

  const escapedMermaid = modelMermaid
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const mermaidHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"><\/script>
  <style>body{margin:0;padding:16px;background:#fff;font-family:sans-serif}.mermaid{display:flex;justify-content:center}.err{color:#c62828;padding:16px;font-size:14px}</style>
</head>
<body>
  <div id="mm" class="mermaid">${escapedMermaid}</div>
  <div id="err" class="err" style="display:none"></div>
  <script>
    mermaid.initialize({startOnLoad:false,theme:'neutral',securityLevel:'loose'});
    try {
      mermaid.run({nodes:document.querySelectorAll('.mermaid')}).catch(function(e){
        document.getElementById('err').textContent='図の表示に失敗しました。';
        document.getElementById('err').style.display='block';
      });
    } catch(e) {
      document.getElementById('err').textContent='図の表示に失敗しました。';
      document.getElementById('err').style.display='block';
    }
  </script>
</body>
</html>`;

  const handleNodePress = (id: string) => {
    if (arrowFrom) {
      if (arrowFrom === id) {
        setArrowFrom(null);
      } else {
        setArrows((prev) => [...prev, { from: arrowFrom, to: id }]);
        setArrowFrom(null);
      }
    } else {
      setArrowFrom(id);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.content, { maxHeight: '90%' }]}>
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.title}>
              {mode === 'self' ? '自分で図を書く' : '模範図'}
            </ThemedText>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>閉じる</ThemedText>
            </Pressable>
          </View>

          {mode === 'self' ? (
            <>
              <SelfDrawCanvas
                nodePositions={nodePositions}
                setNodePositions={setNodePositions}
                arrows={arrows}
                arrowFrom={arrowFrom}
                setArrowFrom={setArrowFrom}
                labels={labels}
                onNodePress={handleNodePress}
                onNodeLongPress={(id) => setEditingLabelFor(id)}
                onArrowTap={(i) => setEditingArrowIndex(i)}
                onUpdateArrow={updateArrow}
                onClear={handleClear}
                showSaveAsModel={__DEV__}
                onSaveAsModel={saveAsModel}
                saveToast={saveToast}
              />
              {editingArrowIndex !== null && (
                <ArrowLabelEditModal
                  value={arrows[editingArrowIndex]?.label ?? ''}
                  onSave={(v) => {
                    updateArrow(editingArrowIndex, { label: v.trim() || undefined });
                    setEditingArrowIndex(null);
                  }}
                  onClose={() => setEditingArrowIndex(null)}
                />
              )}
              {editingLabelFor && (
                <LabelEditModal
                  nodeId={editingLabelFor}
                  value={labels[editingLabelFor] ?? ''}
                  onSave={(v) => {
                    setLabels((prev) => (v.trim() ? { ...prev, [editingLabelFor]: v.trim() } : { ...prev, [editingLabelFor]: '' }));
                    setEditingLabelFor(null);
                  }}
                  onClose={() => setEditingLabelFor(null)}
                />
              )}
            </>
          ) : (
            <ScrollView style={styles.modelScroll}>
              {savedDiagram ? (
                <ModelDiagramView arrows={savedDiagram.arrows} labels={savedDiagram.labels} />
              ) : modelLoading ? (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#5A9BD5" />
                  <ThemedText style={{ marginTop: 12, color: '#666' }}>図を生成中…</ThemedText>
                </View>
              ) : modelError ? (
                <ThemedText style={{ color: '#D32F2F', padding: 16 }}>{modelError}</ThemedText>
              ) : modelMermaid ? (
                Platform.OS === 'web' ? (
                  <iframe
                    srcDoc={mermaidHtml}
                    style={{ width: '100%', height: 400, border: 'none' }}
                    sandbox="allow-scripts"
                  />
                ) : (
                  <WebView
                    originWhitelist={['*']}
                    source={{ html: mermaidHtml }}
                    style={{ width: '100%', height: 400 }}
                    scrollEnabled={false}
                  />
                )
              ) : null}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const FIXED_POSITIONS: Record<string, NodePosition> = {
  A: { x: 40, y: 60 },
  B: { x: 180, y: 60 },
  C: { x: 40, y: 160 },
  D: { x: 180, y: 160 },
};

function DraggableLabel({
  text,
  x,
  y,
  onDragEnd,
  canvasWidth,
  canvasHeight,
}: {
  text: string;
  x: number;
  y: number;
  onDragEnd: (x: number, y: number) => void;
  canvasWidth: number;
  canvasHeight: number;
}) {
  const [pos, setPos] = useState({ x, y });
  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);
  const pan = useRef({ startX: 0, startY: 0 }).current;
  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, evt) => {
        pan.startX = pos.x;
        pan.startY = pos.y;
      },
      onPanResponderMove: (_, evt) => {
        const nx = Math.max(0, Math.min(canvasWidth - 40, pan.startX + evt.dx));
        const ny = Math.max(0, Math.min(canvasHeight - 24, pan.startY + evt.dy));
        setPos({ x: nx, y: ny });
      },
      onPanResponderRelease: (_, evt) => {
        const nx = Math.max(0, Math.min(canvasWidth - 40, pan.startX + evt.dx));
        const ny = Math.max(0, Math.min(canvasHeight - 24, pan.startY + evt.dy));
        onDragEnd(nx, ny);
      },
    })
  ).current;
  return (
    <View
      {...responder.panHandlers}
      style={[styles.arrowLabel, { left: pos.x, top: pos.y }]}
    >
      <ThemedText style={styles.arrowLabelText}>{text}</ThemedText>
    </View>
  );
}

function ModelDiagramView({ arrows, labels }: { arrows: Arrow[]; labels: Record<string, string> }) {
  const { width } = Dimensions.get('window');
  const canvasWidth = Math.min(width - 48, 320);
  const canvasHeight = 240;
  return (
    <View style={styles.selfCanvas}>
      <ThemedText style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>保存された模範図</ThemedText>
      <View style={[styles.canvas, { width: canvasWidth, height: canvasHeight }]}>
        {arrows.map((a, i) => {
          const from = FIXED_POSITIONS[a.from];
          const to = FIXED_POSITIONS[a.to];
          if (!from || !to) return null;
          const fx = from.x + NODE_SIZE / 2;
          const fy = from.y + NODE_SIZE / 2;
          const tx = to.x + NODE_SIZE / 2;
          const ty = to.y + NODE_SIZE / 2;
          const angle = Math.atan2(ty - fy, tx - fx);
          const len = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
          const midX = (fx + tx) / 2;
          const midY = (fy + ty) / 2;
          return (
            <View key={i}>
              <View
                style={[
                  styles.arrowLine,
                  {
                    position: 'absolute',
                    left: midX - len / 2,
                    top: midY - 1,
                    width: len,
                    transform: [{ rotate: `${angle}rad` }],
                  },
                ]}
              />
              <View
                style={[
                  styles.arrowhead,
                  {
                    position: 'absolute',
                    left: tx - ARROWHEAD_SIZE,
                    top: ty - ARROWHEAD_SIZE / 2,
                    transform: [{ rotate: `${angle}rad` }],
                  },
                ]}
              />
              {a.label ? (
                <View
                  style={[
                    styles.arrowLabel,
                    styles.arrowLabelReadOnly,
                    {
                      left: (a.labelX ?? (fx + tx) / 2 - 14),
                      top: (a.labelY ?? (fy + ty) / 2 - 10),
                    },
                  ]}
                >
                  <ThemedText style={styles.arrowLabelText}>{a.label}</ThemedText>
                </View>
              ) : null}
            </View>
          );
        })}
        {DEFAULT_NODES.map((id) => {
          const pos = FIXED_POSITIONS[id];
          const label = labels[id];
          const labelHeight = label ? 26 : 0;
          return (
            <View key={id} style={[styles.nodeWrapper, { left: pos.x, top: pos.y - labelHeight }]}>
              {label ? (
                <View style={styles.labelBadge}>
                  <ThemedText style={styles.labelText} numberOfLines={1}>
                    {label}
                  </ThemedText>
                </View>
              ) : null}
              <View
                style={[
                  styles.node,
                  { marginTop: label ? 4 : 0, backgroundColor: '#E3F2FD', borderColor: '#90CAF9' },
                ]}
              >
                <ThemedText style={{ fontWeight: 'bold', color: '#1565C0' }}>{id}</ThemedText>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function ArrowLabelEditModal({
  value,
  onSave,
  onClose,
}: {
  value: string;
  onSave: (v: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value);
  }, [value]);
  return (
    <Modal visible transparent animationType="fade">
      <Pressable style={styles.labelModalOverlay} onPress={onClose}>
        <Pressable style={styles.labelModalContent} onPress={(e) => e.stopPropagation()}>
          <ThemedText style={styles.labelModalTitle}>矢印の数字・ラベル</ThemedText>
          <TextInput
            style={styles.labelInput}
            value={text}
            onChangeText={setText}
            placeholder="例: 1, 100万円, 金銭貸付"
            placeholderTextColor="#999"
            autoFocus
          />
          <View style={styles.labelModalActions}>
            <Pressable style={styles.labelModalBtn} onPress={onClose}>
              <ThemedText style={{ color: '#666' }}>キャンセル</ThemedText>
            </Pressable>
            <Pressable style={styles.labelModalBtn} onPress={() => onSave(text)}>
              <ThemedText style={{ color: '#1565C0', fontWeight: 'bold' }}>保存</ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function LabelEditModal({
  nodeId,
  value,
  onSave,
  onClose,
}: {
  nodeId: string;
  value: string;
  onSave: (v: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value);
  }, [nodeId, value]);
  return (
    <Modal visible transparent animationType="fade">
      <Pressable style={styles.labelModalOverlay} onPress={onClose}>
        <Pressable style={styles.labelModalContent} onPress={(e) => e.stopPropagation()}>
          <ThemedText style={styles.labelModalTitle}>ノード {nodeId} の付箋（立場）</ThemedText>
          <TextInput
            style={styles.labelInput}
            value={text}
            onChangeText={setText}
            placeholder="例: 買主、債権者、保証人"
            placeholderTextColor="#999"
            autoFocus
          />
          <View style={styles.labelModalActions}>
            <Pressable style={styles.labelModalBtn} onPress={onClose}>
              <ThemedText style={{ color: '#666' }}>キャンセル</ThemedText>
            </Pressable>
            <Pressable style={styles.labelModalBtn} onPress={() => onSave(text)}>
              <ThemedText style={{ color: '#1565C0', fontWeight: 'bold' }}>保存</ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function SelfDrawCanvas({
  arrows,
  arrowFrom,
  setArrowFrom,
  labels,
  onNodePress,
  onNodeLongPress,
  onArrowTap,
  onUpdateArrow,
  onClear,
  showSaveAsModel,
  onSaveAsModel,
  saveToast,
}: {
  nodePositions: Record<string, NodePosition>;
  setNodePositions: React.Dispatch<React.SetStateAction<Record<string, NodePosition>>>;
  arrows: Arrow[];
  arrowFrom: string | null;
  setArrowFrom: (id: string | null) => void;
  labels: Record<string, string>;
  onNodePress: (id: string) => void;
  onNodeLongPress: (id: string) => void;
  onArrowTap?: (index: number) => void;
  onUpdateArrow?: (index: number, updates: Partial<Arrow>) => void;
  onClear: () => void;
  showSaveAsModel?: boolean;
  onSaveAsModel?: () => void;
  saveToast?: string | null;
}) {
  const { width } = Dimensions.get('window');
  const canvasWidth = Math.min(width - 48, 320);
  const canvasHeight = 240;

  return (
    <View style={styles.selfCanvas}>
      <ThemedText style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
        ノードをタップで矢印追加。長押しで付箋。矢印タップで数字追加・ドラッグで移動
      </ThemedText>
      <View style={[styles.canvas, { width: canvasWidth, height: canvasHeight }]}>
        {arrows.map((a, i) => {
          const from = FIXED_POSITIONS[a.from];
          const to = FIXED_POSITIONS[a.to];
          if (!from || !to) return null;
          const fx = from.x + NODE_SIZE / 2;
          const fy = from.y + NODE_SIZE / 2;
          const tx = to.x + NODE_SIZE / 2;
          const ty = to.y + NODE_SIZE / 2;
          const angle = Math.atan2(ty - fy, tx - fx);
          const len = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
          const midX = (fx + tx) / 2;
          const midY = (fy + ty) / 2;
          const labelX = a.labelX ?? midX - 14;
          const labelY = a.labelY ?? midY - 10;
          return (
            <View key={i}>
              <View
                style={[
                  styles.arrowLine,
                  {
                    position: 'absolute',
                    left: midX - len / 2,
                    top: midY - 1,
                    width: len,
                    transform: [{ rotate: `${angle}rad` }],
                  },
                ]}
              />
              <View
                style={[
                  styles.arrowhead,
                  {
                    position: 'absolute',
                    left: tx - ARROWHEAD_SIZE,
                    top: ty - ARROWHEAD_SIZE / 2,
                    transform: [{ rotate: `${angle}rad` }],
                  },
                ]}
              />
              <Pressable
                style={[
                  styles.arrowTapArea,
                  { left: midX - 22, top: midY - 22 },
                ]}
                onPress={() => onArrowTap?.(i)}
              />
              {a.label ? (
                <DraggableLabel
                  text={a.label}
                  x={labelX}
                  y={labelY}
                  onDragEnd={(x, y) => onUpdateArrow?.(i, { labelX: x, labelY: y })}
                  canvasWidth={canvasWidth}
                  canvasHeight={canvasHeight}
                />
              ) : null}
            </View>
          );
        })}
        {DEFAULT_NODES.map((id) => {
          const pos = FIXED_POSITIONS[id];
          const label = labels[id];
          const labelHeight = label ? 26 : 0;
          return (
            <View
              key={id}
              style={[
                styles.nodeWrapper,
                { left: pos.x, top: pos.y - labelHeight },
              ]}
            >
              {label ? (
                <View style={styles.labelBadge}>
                  <ThemedText style={styles.labelText} numberOfLines={1}>
                    {label}
                  </ThemedText>
                </View>
              ) : null}
              <Pressable
                style={[
                  styles.node,
                  {
                    marginTop: label ? 4 : 0,
                    backgroundColor: arrowFrom === id ? '#5A9BD5' : '#E3F2FD',
                    borderColor: arrowFrom === id ? '#5A9BD5' : '#90CAF9',
                  },
                ]}
                onPress={() => onNodePress(id)}
                onLongPress={() => onNodeLongPress(id)}
                delayLongPress={400}
              >
                <ThemedText style={{ fontWeight: 'bold', color: '#1565C0' }}>{id}</ThemedText>
              </Pressable>
            </View>
          );
        })}
      </View>
      <View style={styles.selfActions}>
        <ThemedText style={{ fontSize: 12, color: '#666', flex: 1 }}>
          {arrowFrom ? `矢印の始点: ${arrowFrom} → 終点のノードをタップ` : 'ノードをタップして矢印を追加（始点→終点）'}
        </ThemedText>
        <Pressable style={styles.clearBtn} onPress={onClear}>
          <ThemedText style={{ fontSize: 12, color: '#D32F2F' }}>クリア</ThemedText>
        </Pressable>
      </View>
      {showSaveAsModel && onSaveAsModel && (
        <Pressable style={styles.saveAsModelBtn} onPress={onSaveAsModel}>
          <ThemedText style={{ fontSize: 13, color: '#1565C0', fontWeight: 'bold' }}>模範図として保存</ThemedText>
        </Pressable>
      )}
      {saveToast ? (
        <ThemedText style={{ fontSize: 12, color: '#2E7D32', marginTop: 8 }}>{saveToast}</ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 18 },
  closeBtn: {
    backgroundColor: '#666',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modelScroll: { maxHeight: 450 },
  loading: { padding: 40, alignItems: 'center' },
  selfCanvas: { padding: 16 },
  canvas: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    position: 'relative',
  },
  nodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelBadge: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F9A825',
    maxWidth: 80,
  },
  labelText: {
    fontSize: 11,
    color: '#5D4037',
    fontWeight: '600',
  },
  labelModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  labelModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 320,
  },
  labelModalTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  labelInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  labelModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  labelModalBtn: {
    padding: 8,
  },
  arrowLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#333',
  },
  arrowhead: {
    width: 0,
    height: 0,
    borderTopWidth: ARROWHEAD_SIZE / 2,
    borderBottomWidth: ARROWHEAD_SIZE / 2,
    borderLeftWidth: ARROWHEAD_SIZE,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#333',
  },
  arrowTapArea: {
    position: 'absolute',
    width: 44,
    height: 44,
    backgroundColor: 'transparent',
  },
  arrowLabel: {
    position: 'absolute',
    minWidth: 28,
    height: 22,
    backgroundColor: '#FFF8E1',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  arrowLabelReadOnly: {},
  arrowLabelText: {
    fontSize: 12,
    color: '#5D4037',
    fontWeight: '600',
  },
  selfActions: { flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'center' },
  clearBtn: { padding: 8 },
  saveAsModelBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
