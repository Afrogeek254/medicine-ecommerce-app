import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Plus, Flame, RefreshCw } from 'lucide-react-native';

export default function PillReminderScreen() {
  const [reminders, setReminders] = useState([
    {
      id: 'rem-1',
      name: 'Metformin ER 500mg',
      dosage: '1 Tablet with Breakfast',
      time: '08:00 AM',
      period: 'Morning',
      taken: true,
      pillsLeft: 18,
      autoRefill: true
    },
    {
      id: 'rem-2',
      name: 'Ventolin Inhaler',
      dosage: '2 Puffs before afternoon cardio',
      time: '02:30 PM',
      period: 'Afternoon',
      taken: false,
      pillsLeft: 64,
      autoRefill: false
    },
    {
      id: 'rem-3',
      name: 'Lipitor (Atorvastatin) 20mg',
      dosage: '1 Tablet at Bedtime',
      time: '09:30 PM',
      period: 'Night',
      taken: false,
      pillsLeft: 7,
      autoRefill: true
    }
  ]);

  const toggleTaken = (id) => {
    setReminders(prev =>
      prev.map(r => {
        if (r.id === id) {
          const nextTaken = !r.taken;
          if (nextTaken) {
            Alert.alert('Dose Logged! 🎉', `Great job keeping up your medication adherence streak.`);
          }
          return {
            ...r,
            taken: nextTaken,
            pillsLeft: nextTaken ? Math.max(0, r.pillsLeft - 1) : r.pillsLeft + 1
          };
        }
        return r;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pill Reminders & Refills</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Adherence Streak Banner */}
        <View style={styles.streakCard}>
          <View>
            <Text style={styles.streakTag}>ADHERENCE STREAK</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 4 }}>
              <Flame size={24} color="#f59e0b" />
              <Text style={styles.streakTitle}>14 Days Perfect</Text>
            </View>
            <Text style={styles.streakSub}>Consistent medicine intake protects long-term health.</Text>
          </View>
          <Text style={{ fontSize: 36 }}>💊</Text>
        </View>

        <Text style={styles.sectionTitle}>TODAY'S SCHEDULE</Text>

        {reminders.map(rem => (
          <View key={rem.id} style={[styles.remCard, rem.taken && styles.remCardTaken]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.periodText, rem.taken && { color: '#059669' }]}>
                {rem.time} • {rem.period}
              </Text>
              <Text style={styles.remName}>{rem.name}</Text>
              <Text style={styles.remDosage}>{rem.dosage}</Text>
              
              <View style={styles.pillsRow}>
                <Text style={styles.pillsLeft}>{rem.pillsLeft} pills left</Text>
                {rem.autoRefill && (
                  <View style={styles.refillPill}>
                    <RefreshCw size={10} color="#059669" />
                    <Text style={styles.refillText}>Auto-Refill Active</Text>
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.checkBtn, rem.taken && styles.checkBtnTaken]}
              onPress={() => toggleTaken(rem.id)}
            >
              {rem.taken && <Check size={18} color="#ffffff" />}
            </TouchableOpacity>
          </View>
        ))}

        {/* Smart Chronic Refill Card */}
        <View style={styles.refillCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.refillTitle}>Smart Auto-Refill Guarantee</Text>
            <Text style={styles.refillSub}>
              When pills hit &lt; 5, PharmaCare automatically prepares your next 30-day supply with your pharmacy benefits.
            </Text>
          </View>
          <Text style={{ fontSize: 32 }}>📦</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  scroll: { padding: 16 },
  streakCard: {
    backgroundColor: '#059669',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakTag: { fontSize: 10, fontWeight: '800', color: '#a7f3d0' },
  streakTitle: { fontSize: 20, fontWeight: '800', color: '#ffffff' },
  streakSub: { fontSize: 11, color: '#d1fae5', maxWidth: 220 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#64748b', marginBottom: 10 },
  remCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  remCardTaken: { backgroundColor: '#f0fdf4', borderColor: '#a7f3d0' },
  periodText: { fontSize: 10, fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' },
  remName: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginVertical: 2 },
  remDosage: { fontSize: 11, color: '#64748b' },
  pillsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  pillsLeft: { fontSize: 10, color: '#475569', backgroundColor: '#f1f5f9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  refillPill: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  refillText: { fontSize: 10, color: '#059669', fontWeight: '700' },
  checkBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  checkBtnTaken: { backgroundColor: '#10b981', borderColor: '#10b981' },
  refillCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  refillTitle: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  refillSub: { fontSize: 11, color: '#64748b', marginTop: 2, lineHeight: 15 },
});
