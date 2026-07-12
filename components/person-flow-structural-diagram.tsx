import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type {
  StructuralPersonFlowDiagram,
  StructuralNodeTone,
} from '@/src/personFlowStructural';

const TONE_BG: Record<StructuralNodeTone, string> = {
  court: '#E0E7FF',
  person: '#FEF3C7',
  guardian: '#D1FAE5',
  supervisor: '#E0F2FE',
  neutral: '#F1F5F9',
};

const TONE_BORDER: Record<StructuralNodeTone, string> = {
  court: '#6366F1',
  person: '#D97706',
  guardian: '#059669',
  supervisor: '#0284C7',
  neutral: '#94A3B8',
};

export function PersonFlowStructuralDiagram({
  diagram,
}: {
  diagram: StructuralPersonFlowDiagram;
}) {
  const nodeMap = new Map(diagram.nodes.map((n) => [n.id, n]));

  return (
    <View style={styles.root}>
      <ThemedText style={styles.title}>{diagram.title}</ThemedText>
      {diagram.subtitle ? (
        <ThemedText style={styles.subtitle}>{diagram.subtitle}</ThemedText>
      ) : null}

      {diagram.steps && diagram.steps.length > 0 ? (
        <View style={styles.stepsBox}>
          <ThemedText style={styles.sectionLabel}>時系列</ThemedText>
          {diagram.steps.map((step, i) => (
            <View key={`${step.label}-${i}`} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <ThemedText style={styles.stepBadgeText}>{i + 1}</ThemedText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.stepLabel}>{step.label}</ThemedText>
                {step.detail ? (
                  <ThemedText style={styles.stepDetail}>{step.detail}</ThemedText>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ) : null}

      <ThemedText style={[styles.sectionLabel, { marginTop: 12 }]}>登場人物</ThemedText>
      <View style={styles.nodesRow}>
        {diagram.nodes.map((node) => {
          const tone = node.tone || 'neutral';
          return (
            <View
              key={node.id}
              style={[
                styles.nodeCard,
                { backgroundColor: TONE_BG[tone], borderColor: TONE_BORDER[tone] },
              ]}
            >
              <ThemedText style={styles.nodeLabel}>{node.label}</ThemedText>
              {node.role ? <ThemedText style={styles.nodeRole}>{node.role}</ThemedText> : null}
            </View>
          );
        })}
      </View>

      <ThemedText style={[styles.sectionLabel, { marginTop: 12 }]}>関係（矢印）</ThemedText>
      <View style={styles.edgesBox}>
        {diagram.edges.map((edge, i) => {
          const from = nodeMap.get(edge.from)?.label || edge.from;
          const to = nodeMap.get(edge.to)?.label || edge.to;
          return (
            <View
              key={`${edge.from}-${edge.to}-${i}`}
              style={[styles.edgeRow, edge.dashed ? styles.edgeDashed : null]}
            >
              <ThemedText style={styles.edgeFrom}>{from}</ThemedText>
              <View style={styles.arrowCol}>
                <ThemedText style={styles.arrowGlyph}>{edge.dashed ? '⇢' : '→'}</ThemedText>
                <ThemedText style={styles.edgeLabel}>{edge.label}</ThemedText>
              </View>
              <ThemedText style={styles.edgeTo}>{to}</ThemedText>
            </View>
          );
        })}
      </View>

      {diagram.notes && diagram.notes.length > 0 ? (
        <View style={styles.notesBox}>
          <ThemedText style={styles.sectionLabel}>試験で切るポイント</ThemedText>
          {diagram.notes.map((note, i) => (
            <ThemedText key={i} style={styles.noteLine}>
              ・{note}
            </ThemedText>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  stepsBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    padding: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3949AB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepDetail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 17,
  },
  nodesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nodeCard: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: '45%',
    flexGrow: 1,
  },
  nodeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  nodeRole: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  edgesBox: {
    gap: 8,
  },
  edgeRow: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5B4FC',
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  edgeDashed: {
    borderStyle: 'dashed',
    borderColor: '#94A3B8',
    backgroundColor: '#F8FAFC',
  },
  edgeFrom: {
    fontSize: 13,
    fontWeight: '700',
    color: '#312E81',
  },
  edgeTo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#312E81',
    marginTop: 2,
  },
  arrowCol: {
    marginVertical: 2,
  },
  arrowGlyph: {
    fontSize: 16,
    color: '#4338CA',
    fontWeight: '700',
  },
  edgeLabel: {
    fontSize: 12,
    color: '#4338CA',
    marginTop: 1,
  },
  notesBox: {
    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
    padding: 10,
  },
  noteLine: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
    marginBottom: 4,
  },
});
