import { useEffect, type ReactNode } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';

const INITIAL_TOP = 72;
const INITIAL_RIGHT = 12;
const MIN_WIDTH = 240;
const MIN_HEIGHT = 160;
const DEFAULT_MAX_WIDTH = 420;
const DEFAULT_HEIGHT_RATIO = 0.42;

function headerHeightFor(panelHeight: number): number {
  'worklet';
  if (panelHeight < 200) return 32;
  return 36;
}

function panelHeightForWidth(width: number, aspectRatio: number): number {
  'worklet';
  const bodyH = width / aspectRatio;
  const headerH = headerHeightFor(bodyH + 32);
  return headerH + bodyH;
}

function fitPanelToAspectRatio(
  width: number,
  aspectRatio: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  let w = Math.min(width, maxWidth);
  let h = panelHeightForWidth(w, aspectRatio);
  if (h > maxHeight) {
    const bodyH = maxHeight - headerHeightFor(maxHeight);
    w = Math.min(maxWidth, bodyH * aspectRatio);
    h = panelHeightForWidth(w, aspectRatio);
  }
  return { width: w, height: h };
}

export function DraggableFloatingModal({
  visible,
  onClose,
  title,
  children,
  scrollable = true,
  fillContent = false,
  contentAspectRatio,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  scrollable?: boolean;
  /** true のとき子要素がボディ領域を flex で埋める（図解向け） */
  fillContent?: boolean;
  /** 指定時はボディ高さを width/aspectRatio に固定（図解の余白除去） */
  contentAspectRatio?: number;
}) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const maxWidth = windowWidth - 24;
  const maxHeight = windowHeight - INITIAL_TOP - 16;

  const fitted = contentAspectRatio
    ? fitPanelToAspectRatio(Math.min(windowWidth - 24, DEFAULT_MAX_WIDTH), contentAspectRatio, maxWidth, maxHeight)
    : null;
  const defaultWidth = fitted?.width ?? Math.min(windowWidth - 24, DEFAULT_MAX_WIDTH);
  const defaultHeight =
    fitted?.height ?? Math.min(windowHeight * DEFAULT_HEIGHT_RATIO, windowHeight - INITIAL_TOP - 24);
  const defaultLeft = Math.max(12, windowWidth - INITIAL_RIGHT - defaultWidth);

  const panelLeft = useSharedValue(defaultLeft);
  const panelTop = useSharedValue(INITIAL_TOP);
  const panelWidth = useSharedValue(defaultWidth);
  const panelHeight = useSharedValue(defaultHeight);

  const savedLeft = useSharedValue(defaultLeft);
  const savedTop = useSharedValue(INITIAL_TOP);
  const savedWidth = useSharedValue(defaultWidth);
  const savedHeight = useSharedValue(defaultHeight);

  const maxWidthSv = useSharedValue(maxWidth);
  const maxHeightSv = useSharedValue(maxHeight);
  const minWidthSv = useSharedValue(MIN_WIDTH);
  const minHeightSv = useSharedValue(MIN_HEIGHT);
  const contentAspectRatioSv = useSharedValue(contentAspectRatio ?? 0);

  useEffect(() => {
    contentAspectRatioSv.value = contentAspectRatio ?? 0;
  }, [contentAspectRatio, contentAspectRatioSv]);

  useEffect(() => {
    maxWidthSv.value = maxWidth;
    maxHeightSv.value = maxHeight;
  }, [maxWidth, maxHeight, maxWidthSv, maxHeightSv]);

  useEffect(() => {
    if (!visible) return;
    const fit = contentAspectRatio
      ? fitPanelToAspectRatio(Math.min(windowWidth - 24, DEFAULT_MAX_WIDTH), contentAspectRatio, maxWidth, maxHeight)
      : null;
    const w = fit?.width ?? Math.min(windowWidth - 24, DEFAULT_MAX_WIDTH);
    const h =
      fit?.height ?? Math.min(windowHeight * DEFAULT_HEIGHT_RATIO, windowHeight - INITIAL_TOP - 24);
    const left = Math.max(12, windowWidth - INITIAL_RIGHT - w);
    panelLeft.value = left;
    panelTop.value = INITIAL_TOP;
    panelWidth.value = w;
    panelHeight.value = h;
    savedLeft.value = left;
    savedTop.value = INITIAL_TOP;
    savedWidth.value = w;
    savedHeight.value = h;
  }, [
    visible,
    windowWidth,
    windowHeight,
    contentAspectRatio,
    maxWidth,
    maxHeight,
    panelLeft,
    panelTop,
    panelWidth,
    panelHeight,
    savedHeight,
    savedLeft,
    savedTop,
    savedWidth,
  ]);

  const pan = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      savedLeft.value = panelLeft.value;
      savedTop.value = panelTop.value;
    })
    .onUpdate((e) => {
      panelLeft.value = savedLeft.value + e.translationX;
      panelTop.value = savedTop.value + e.translationY;
    });

  const resize = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      savedWidth.value = panelWidth.value;
      savedHeight.value = panelHeight.value;
    })
    .onUpdate((e) => {
      const newWidth = clamp(
        savedWidth.value + e.translationX,
        minWidthSv.value,
        maxWidthSv.value,
      );
      panelWidth.value = newWidth;
      if (contentAspectRatioSv.value > 0) {
        panelHeight.value = clamp(
          panelHeightForWidth(newWidth, contentAspectRatioSv.value),
          minHeightSv.value,
          maxHeightSv.value,
        );
      } else {
        panelHeight.value = clamp(
          savedHeight.value + e.translationY,
          minHeightSv.value,
          maxHeightSv.value,
        );
      }
    });

  const headerH = useDerivedValue(() => headerHeightFor(panelHeight.value));

  const panelAnimatedStyle = useAnimatedStyle(() => ({
    left: panelLeft.value,
    top: panelTop.value,
    width: panelWidth.value,
    height: panelHeight.value,
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: headerH.value,
  }));

  const bodyStyle = useAnimatedStyle(() => ({
    height: Math.max(0, panelHeight.value - headerH.value),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    fontSize: panelHeight.value < 220 ? 13 : 15,
  }));

  const bodyInner = fillContent ? (
    <View style={styles.fillInner}>{children}</View>
  ) : scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollBody}
      showsVerticalScrollIndicator
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.scrollBody}>{children}</View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.root} pointerEvents="box-none">
        <Animated.View style={[styles.panel, panelAnimatedStyle]}>
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <GestureDetector gesture={pan}>
              <Animated.View style={styles.dragHandle}>
                <View style={styles.headerTextWrap}>
                  <Animated.Text style={[styles.titleText, titleStyle]}>{title}</Animated.Text>
                </View>
              </Animated.View>
            </GestureDetector>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
              <ThemedText style={styles.closeBtnText}>閉じる</ThemedText>
            </Pressable>
          </Animated.View>
          <Animated.View style={[styles.bodyWrap, bodyStyle]}>{bodyInner}</Animated.View>
          <GestureDetector gesture={resize}>
            <Animated.View style={styles.resizeHandle} accessibilityLabel="サイズ変更">
              <View style={styles.resizeGrip} />
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? 'transparent' : 'rgba(0,0,0,0.08)',
  },
  panel: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  dragHandle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 0,
    cursor: Platform.OS === 'web' ? ('grab' as const) : undefined,
  },
  headerTextWrap: {
    flex: 1,
    overflow: 'hidden',
  },
  titleText: {
    fontWeight: '600',
    color: '#111',
  },
  closeBtn: {
    backgroundColor: '#64748b',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  bodyWrap: {
    overflow: 'hidden',
  },
  fillInner: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    flex: 1,
  },
  scrollBody: {
    alignItems: 'stretch',
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: Platform.OS === 'web' ? ('nwse-resize' as const) : undefined,
  },
  resizeGrip: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#94a3b8',
  },
});
