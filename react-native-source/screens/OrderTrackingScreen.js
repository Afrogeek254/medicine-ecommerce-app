import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Clock, Snowflake, Phone } from 'lucide-react-native';

export default function OrderTrackingScreen() {
  const steps = [
    { title: 'Order Placed & Sanitized', desc: 'Received at Springfield Micro-Hub', completed: true },
    { title: 'Prescription Verified', desc: 'Approved by Dr. Sarah Jenkins, PharmD', completed: true },
    { title: 'Cold-Chain Packaging', desc: 'Sealed in isothermal pouch with dry gel packs', completed: true },
    { title: 'Out for Express Delivery', desc: 'Courier David Chen is 18 mins away', active: true },
    { title: 'Contactless Delivery Handover', desc: 'Requires signature / PIN', completed: false }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Pharmacy Fulfillment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Order Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.orderHead}>
            <View>
              <Text style={styles.orderId}>ORDER #ORD-9934</Text>
              <Text style={styles.orderStatusText}>Out for Express Delivery</Text>
            </View>
            <View style={styles.speedBadge}>
              <Text style={styles.speedText}>⚡ 25 Min Express</Text>
            </View>
          </View>

          {/* Map Simulation */}
          <View style={styles.mapBox}>
            <Text style={{ fontSize: 40 }}>🛵 💨</Text>
            <View style={styles.etaPill}>
              <Text style={styles.etaText}>Courier ETA: 18 Minutes</Text>
            </View>
          </View>

          {/* Cold-Chain Telemetry Reading */}
          <View style={styles.coldPill}>
            <Snowflake size={14} color="#0d9488" />
            <Text style={styles.coldLabel}>Insulin Cooler Temperature: </Text>
            <Text style={styles.coldTemp}>4.2°C (Optimal)</Text>
          </View>

          {/* Fulfillment Stepper */}
          <View style={styles.stepper}>
            {steps.map((st, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[
                  styles.circle,
                  st.completed && styles.circleDone,
                  st.active && styles.circleActive
                ]}>
                  <Text style={styles.circleNum}>{st.completed ? '✓' : (i + 1)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.stepTitle, st.active && { color: '#0284c7' }]}>{st.title}</Text>
                  <Text style={styles.stepDesc}>{st.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Courier Card */}
          <View style={styles.courierCard}>
            <View>
              <Text style={styles.courierName}>David Chen</Text>
              <Text style={styles.courierSub}>Vaccinated Certified Cold-Courier</Text>
            </View>
            <TouchableOpacity 
              style={styles.callBtn}
              onPress={() => Alert.alert('Contacting Courier', 'Calling David Chen at +1 (555) 749-3012')}
            >
              <Phone size={14} color="#ffffff" />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
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
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
  },
  orderHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderId: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  orderStatusText: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  speedBadge: { backgroundColor: '#e0f2fe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  speedText: { fontSize: 11, fontWeight: '700', color: '#0284c7' },
  mapBox: {
    height: 120,
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  etaPill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: 6,
  },
  etaText: { fontSize: 11, fontWeight: '700', color: '#0284c7' },
  coldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#99f6e4',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    gap: 6,
  },
  coldLabel: { fontSize: 11, color: '#0d9488', fontWeight: '600' },
  coldTemp: { fontSize: 11, fontWeight: '800', color: '#0f766e' },
  stepper: { marginVertical: 12 },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: { backgroundColor: '#10b981' },
  circleActive: { backgroundColor: '#0284c7' },
  circleNum: { fontSize: 11, fontWeight: '700', color: '#ffffff' },
  stepTitle: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  stepDesc: { fontSize: 11, color: '#64748b', marginTop: 2 },
  courierCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  courierName: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  courierSub: { fontSize: 11, color: '#64748b' },
  callBtn: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  callBtnText: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
});
