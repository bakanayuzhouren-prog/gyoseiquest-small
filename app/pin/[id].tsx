import { router, useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PIN_CASES } from '@/src/pinData';
import Constants from 'expo-constants';

export default function CaseDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const caseData = PIN_CASES.find(c => c.id === id);
    const { width } = useWindowDimensions();

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
          .case-diagram { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; background: #f9f9f9; padding: 10px; border-radius: 8px; }
          .party { text-align: center; width: 30%; }
          .icon { font-size: 40px; margin-bottom: 5px; }
          .name { font-weight: bold; font-size: 14px; }
          .balloon { background: #fff; border: 1px solid #ccc; padding: 8px; border-radius: 8px; font-size: 12px; margin-top: 5px; position: relative; }
          .arrow { width: 10%; text-align: center; color: #888; font-size: 20px; }
          .arrow .label { display: block; font-size: 10px; }
          .result-box { border: 2px solid #5A9BD5; padding: 15px; border-radius: 8px; background: #E9F2FB; margin-bottom: 20px; }
          .result-box h3 { margin-top: 0; color: #5A9BD5; }
          h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        </style>
      </head>
      <body>
        <h2>${caseData.title}</h2>
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
                <ThemedText type="defaultSemiBold">戻る</ThemedText>
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
