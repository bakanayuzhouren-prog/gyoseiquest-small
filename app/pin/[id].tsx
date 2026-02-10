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
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            padding: 16px; 
            color: #333; 
            background-color: #f5f7fa;
            margin: 0;
          }
          .card {
            background-color: #ffffff;
            border: 2px solid #000000;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            margin-bottom: 20px;
          }
          .case-diagram { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; background: #f9f9f9; padding: 10px; border-radius: 8px; }
          .party { text-align: center; width: 30%; }
          .icon { font-size: 40px; margin-bottom: 5px; }
          .name { font-weight: bold; font-size: 14px; }
          .balloon { background: #fff; border: 1px solid #ccc; padding: 8px; border-radius: 8px; font-size: 12px; margin-top: 5px; position: relative; }
          .arrow { width: 10%; text-align: center; color: #888; font-size: 20px; }
          .arrow .label { display: block; font-size: 10px; }
          .result-box { border: 2px solid #5A9BD5; padding: 15px; border-radius: 8px; background: #E9F2FB; margin-bottom: 20px; }
          .result-box h3 { margin-top: 0; color: #5A9BD5; }
          h2 { border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 10px; margin-top: 0; margin-bottom: 20px; font-size: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>${caseData.title}</h2>
          ${caseData.content}
        </div>
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
        backgroundColor: '#f5f7fa',
        paddingTop: Platform.OS === 'ios' ? 60 : Constants.statusBarHeight,
    },
    backButton: {
        alignSelf: 'center',
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});
