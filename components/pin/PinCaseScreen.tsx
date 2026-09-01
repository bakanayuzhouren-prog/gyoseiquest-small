import { router } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PinRelatedImages } from '@/components/pin/PinRelatedImages';
import type { PinCase } from '@/src/pinData';

const WRAP_CSS = `
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding: 20px;
  color: #333;
  margin: 0;
  background: #fff;
}
.case-diagram-container { max-width: 100% !important; box-shadow: none !important; margin: 0 !important; }
.header-box { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
.header-box h3 { margin: 10px 0 5px; font-size: 1.2em; color: #2c3e50; }
.badge { color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; }
.badge.green { background: #27ae60; }
.diagram-area { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; position: relative; }
.party-box { width: 32%; text-align: center; z-index: 2; }
.icon-area { margin-bottom: 10px; }
.kaomoji { display: block; font-size: 3em; margin-bottom: 5px; }
.role { font-weight: bold; font-size: 0.9em; display: block; color: #555; }
.balloon { position: relative; padding: 10px; border-radius: 8px; font-size: 0.85em; line-height: 1.4; text-align: left; background: #f8f9fa; border: 1px solid #ddd; }
.balloon strong { color: #e74c3c; }
.pl-balloon { border-left: 4px solid #3498db; }
.def-balloon { border-left: 4px solid #95a5a6; }
.versus-area { width: 30%; text-align: center; margin-top: 30px; position: relative; }
.vs-badge { background: #95a5a6; color: #fff; padding: 5px 8px; border-radius: 20px; font-size: 0.9em; font-weight: bold; }
.action-label { display: block; margin-top: 5px; font-size: 0.8em; color: #7f8c8d; }
.ruling-box { background: #eef9fe; border: 2px solid #5A9BD5; border-radius: 12px; overflow: hidden; }
.ruling-header { background: #5A9BD5; color: #fff; padding: 8px 15px; font-weight: bold; display: flex; align-items: center; }
.gavel { margin-right: 8px; font-size: 1.2em; }
.ruling-content { padding: 15px; text-align: center; }
.conclusion { font-size: 1.3em; color: #2980b9; margin-bottom: 15px; border-bottom: 1px dashed #aad4e9; padding-bottom: 10px; }
.logic-flow { text-align: left; font-size: 0.9em; background: #fff; padding: 10px; border-radius: 8px; }
.check { background: #27ae60; color: #fff; padding: 1px 5px; border-radius: 3px; font-size: 0.8em; margin-right: 5px; }
.arrow-down { text-align: center; margin: 5px 0; color: #bdc3c7; }
.context-box { background: #fff8e1; border: 2px dashed #f1c40f; border-radius: 8px; padding: 10px; margin-bottom: 20px; text-align: center; }
.context-title { font-weight: bold; color: #d35400; margin-bottom: 5px; font-size: 0.9em; }
.context-content { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; }
.context-note { width: 100%; margin-top: 5px; font-size: 0.85em; color: #555; }
.chase-flow { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin: 8px 0 4px; }
.chase-step { display: flex; flex-direction: column; align-items: center; }
.chase-icon { font-size: 1.8em; line-height: 1.2; display: inline-block; }
.chase-face-east { transform: scaleX(-1); }
.chase-cap { font-size: 0.7em; font-weight: bold; color: #7f8c8d; margin-top: 2px; }
.chase-arrow { font-size: 0.85em; font-weight: bold; color: #d35400; }
`;

function splitRulingHtml(html: string): { main: string; ruling: string } {
  const marker = '<div class="ruling-box">';
  const idx = html.indexOf(marker);
  if (idx < 0) return { main: html, ruling: '' };
  const main = `${html.slice(0, idx).trimEnd()}\n</div>`;
  const rest = html.slice(idx).trim();
  return { main, ruling: `<div class="case-diagram-container">\n${rest}` };
}

function wrapDoc(body: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${WRAP_CSS}</style>
  </head>
  <body>${body}</body>
</html>`;
}

export function PinCaseScreen({
  caseData,
  backLabel,
}: {
  caseData: PinCase;
  backLabel: string;
}) {
  const { main, ruling } = splitRulingHtml(caseData.content);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        {Platform.OS === 'web' ? (
          <div>
            <style>{WRAP_CSS}</style>
            <div dangerouslySetInnerHTML={{ __html: main }} />
          </div>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{ html: wrapDoc(main) }}
            style={styles.webview}
            scrollEnabled
          />
        )}

        <PinRelatedImages keys={caseData.images} notes={caseData.imageNote} />

        {ruling ? (
          Platform.OS === 'web' ? (
            <div dangerouslySetInnerHTML={{ __html: ruling }} />
          ) : (
            <WebView
              originWhitelist={['*']}
              source={{ html: wrapDoc(ruling) }}
              style={styles.rulingWebview}
              scrollEnabled
            />
          )
        ) : null}

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ThemedText type="defaultSemiBold">{backLabel}</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  scroll: { flex: 1 },
  scrollInner: { paddingBottom: 16 },
  webview: {
    minHeight: 720,
    backgroundColor: 'transparent',
  },
  rulingWebview: {
    minHeight: 420,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
});
