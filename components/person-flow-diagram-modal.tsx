import { useEffect, useState } from 'react';
import { Image, type ImageLoadEvent, ScrollView, StyleSheet, View } from 'react-native';

import { DraggableFloatingModal } from '@/components/draggable-floating-modal';
import { PersonFlowStructuralDiagram } from '@/components/person-flow-structural-diagram';
import { ThemedText } from '@/components/themed-text';
import type { CastMember } from '@/src/castRegistry';
import type { PersonFlowDiagramItem } from '@/src/personFlowImages';

/** personFlowCanvasLayout: CANVAS_W=1200, 典型トリム高さ ~280px */
const PERSON_FLOW_DEFAULT_ASPECT = 1200 / 280;

function readLoadedImageSize(event: ImageLoadEvent): { width?: number; height?: number } {
  const nativeEvent = event.nativeEvent as ImageLoadEvent['nativeEvent'] & {
    target?: { naturalWidth?: number; naturalHeight?: number };
  };

  const fromSource = nativeEvent.source;
  if (fromSource?.width && fromSource?.height) {
    return { width: fromSource.width, height: fromSource.height };
  }

  const target = nativeEvent.target;
  if (target?.naturalWidth && target?.naturalHeight) {
    return { width: target.naturalWidth, height: target.naturalHeight };
  }

  return {};
}

function castKindLabel(kind: CastMember['kind']): string {
  if (kind === 'letter') return '記号';
  if (kind === 'role') return '役割';
  if (kind === 'thing') return '物';
  return '機関';
}

function CastLegend({ members }: { members: CastMember[] }) {
  if (members.length === 0) return null;
  return (
    <View style={styles.castBox}>
      <ThemedText style={styles.castHeading}>この問題の登場人物</ThemedText>
      {members.map((m) => (
        <View key={m.id} style={styles.castRow}>
          <ThemedText style={styles.castLabel}>{m.label}</ThemedText>
          <ThemedText style={styles.castMeta}>
            {castKindLabel(m.kind)}
            {m.originalName ? ` · 元:${m.originalName}` : ''}
            {m.customizable ? ' · 名前設定で変更可' : ''}
          </ThemedText>
        </View>
      ))}
      <ThemedText style={styles.castHint}>
        A〜T の記号は歯車「名前設定」で好きな名前にできます。役割名・機関名は固定です。
      </ThemedText>
    </View>
  );
}

export function PersonFlowDiagramModal({
  visible,
  onClose,
  item,
  castMembers = [],
  title = '登場人物',
  emptyLabel = '関係図は未生成です。',
}: {
  visible: boolean;
  onClose: () => void;
  item: PersonFlowDiagramItem | null;
  castMembers?: CastMember[];
  title?: string;
  /** 図がないときの表示（民法・登場人物ゼロ） */
  emptyLabel?: string;
}) {
  const [contentAspectRatio, setContentAspectRatio] = useState(PERSON_FLOW_DEFAULT_ASPECT);
  const hasStructural = !!item?.structural;
  const hasImage = !!item?.source;

  useEffect(() => {
    if (!item?.source) return;
    if (typeof Image.resolveAssetSource === 'function') {
      const resolved = Image.resolveAssetSource(item.source);
      if (resolved?.width && resolved?.height) {
        setContentAspectRatio(resolved.width / resolved.height);
        return;
      }
    }
    if (item.source && typeof item.source === 'object') {
      const { width, height } = item.source as { width?: number; height?: number };
      if (width && height) {
        setContentAspectRatio(width / height);
        return;
      }
    }
    setContentAspectRatio(PERSON_FLOW_DEFAULT_ASPECT);
  }, [item?.source]);

  const handleImageLoad = (event: ImageLoadEvent) => {
    const { width, height } = readLoadedImageSize(event);
    if (width && height && width > 0 && height > 0) {
      setContentAspectRatio(width / height);
    }
  };

  const hasCast = castMembers.length > 0;
  const hasDiagram = hasImage || hasStructural;
  /** 構造図は自分で登場人物を描く。画像図があるときも一覧は重複なので非表示 */
  const showCastLegend = hasCast && !hasDiagram;

  return (
    <DraggableFloatingModal
      visible={visible}
      onClose={onClose}
      title={title}
      fillContent={hasImage}
      scrollable={!hasImage}
      contentAspectRatio={hasImage ? contentAspectRatio : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {showCastLegend ? <CastLegend members={castMembers} /> : null}
        {hasStructural && item?.structural ? (
          <PersonFlowStructuralDiagram diagram={item.structural} />
        ) : hasImage ? (
          <Image
            source={item!.source!}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="登場人物関係図"
            onLoad={handleImageLoad}
          />
        ) : hasCast ? null : (
          <ThemedText style={styles.empty}>{emptyLabel}</ThemedText>
        )}
        {!hasDiagram && hasCast ? (
          <ThemedText style={styles.emptySub}>関係図は順次追加予定です。</ThemedText>
        ) : null}
      </ScrollView>
    </DraggableFloatingModal>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  castBox: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  castHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  castRow: {
    marginBottom: 6,
  },
  castLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  castMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  castHint: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 8,
    lineHeight: 16,
  },
  image: {
    flex: 1,
    width: '100%',
    minHeight: 200,
    height: '100%',
  },
  empty: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 24,
  },
  emptySub: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
  },
});
