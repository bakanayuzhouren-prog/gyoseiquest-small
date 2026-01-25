import { router, useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PIN_CASES } from '@/src/pinData';
import Constants from 'expo-constants';

export default function CaseDetailScreen() {
    const { id } = useLocalSearchParams<{ category: string, id: string }>();
    const caseData = PIN_CASES.find(c => c.id === id);

    if (!caseData) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Case not found</ThemedText>
                <Pressable onPress={() => router.back()}><ThemedText>Back</ThemedText></Pressable>
            </ThemedView>
        );
    }

    // Construct HTML for WebView
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #333; }
          .case-diagram-container { max-width: 100% !important; box-shadow: none !important; margin: 0 !important; }
          /* Preserve existing styles from markdown */
          .header-box { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
          .header-box h3 { margin: 10px 0 5px; font-size: 1.2em; color: #2c3e50; }
          .badge { color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; }
          .badge.red { background: #e74c3c; }
          .diagram-area { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; position: relative; }
          .party-box { width: 32%; text-align: center; z-index: 2; }
          .icon-area { margin-bottom: 10px; }
          .kaomoji { display: block; font-size: 3em; margin-bottom: 5px; animation: bounce 2s infinite; }
          .role { font-weight: bold; font-size: 0.9em; display: block; color: #555; }
          .balloon { position: relative; padding: 10px; border-radius: 8px; font-size: 0.85em; line-height: 1.4; text-align: left; background: #f8f9fa; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
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
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        </style>
      </head>
      <body>
        ${caseData.content}
      </body>
    </html>
  `;

    return (
        <ThemedView style={styles.container}>
            {Platform.OS === 'web' ? (
                <iframe
                    srcDoc={htmlContent}
                    style={{ flex: 1, border: 'none', width: '100%', height: 'calc(100% - 60px)' }}
                />
            ) : (
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    scrollEnabled={true}
                />
            )}

            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <ThemedText type="defaultSemiBold">一覧に戻る</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    backButton: {
        padding: 16,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
    },
});
