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
import { Camera, Upload, CheckCircle2, FileText } from 'lucide-react-native';

export default function PrescriptionScreen({ navigation }) {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'rx-2026-0891',
      patient: 'John Doe',
      doctor: 'Dr. Arthur Mitchell, MD',
      clinic: 'St. Jude Heart Center',
      date: 'Nov 04, 2026',
      status: 'Verified & Active',
      medicines: ['Lipitor 20mg (30 Tabs)', 'Bayer Aspirin 81mg', 'Metoprolol 25mg']
    }
  ]);

  const handleUploadNew = () => {
    Alert.alert(
      'Upload Prescription',
      'Choose source to upload your prescription slip:',
      [
        { text: '📷 Camera', onPress: () => addNewMockRx() },
        { text: '🖼️ Photo Library', onPress: () => addNewMockRx() },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const addNewMockRx = () => {
    const newRx = {
      id: `rx-${Date.now().toString().slice(-4)}`,
      patient: 'John Doe',
      doctor: 'Dr. Sarah Jenkins, MD',
      clinic: 'Metropolitan Medical Pavilion',
      date: 'Today',
      status: 'Verified & Active',
      medicines: ['Augmentin 625 Duo (10 Tabs)', 'Panadol Extra']
    };
    setPrescriptions([newRx, ...prescriptions]);
    Alert.alert('✅ Rx Verified', 'Dr. Sarah Jenkins (PharmD) has approved your prescription.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor's Prescriptions (Rx)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Upload Prescription Action Card */}
        <TouchableOpacity style={styles.uploadBox} onPress={handleUploadNew}>
          <View style={styles.iconCircle}>
            <Camera size={24} color="#0284c7" />
          </View>
          <Text style={styles.uploadTitle}>Snap or Upload New Prescription</Text>
          <Text style={styles.uploadSubtitle}>
            Certified pharmacists review prescriptions 24/7 in under 5 minutes.
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Saved & Active Prescriptions</Text>

        {prescriptions.map(rx => (
          <View key={rx.id} style={styles.rxCard}>
            <View style={styles.rxTop}>
              <View>
                <View style={styles.statusPill}>
                  <CheckCircle2 size={12} color="#10b981" />
                  <Text style={styles.statusText}>{rx.status}</Text>
                </View>
                <Text style={styles.doctorName}>{rx.doctor}</Text>
                <Text style={styles.clinicName}>{rx.clinic} • {rx.date}</Text>
              </View>
            </View>

            <View style={styles.medsBox}>
              <Text style={styles.medsHeading}>Prescribed Medicines:</Text>
              {rx.medicines.map((m, idx) => (
                <Text key={idx} style={styles.medItem}>• {m}</Text>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.reorderBtn}
              onPress={() => {
                Alert.alert('Prescription Reordered', 'Items added to cart with attached prescription!');
                navigation.navigate('Cart');
              }}
            >
              <Text style={styles.reorderText}>🛒 Reorder All Prescribed Medicines</Text>
            </TouchableOpacity>
          </View>
        ))}

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
  uploadBox: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#0284c7',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTitle: { fontSize: 14, fontWeight: '700', color: '#0369a1', marginBottom: 4 },
  uploadSubtitle: { fontSize: 11, color: '#64748b', textAlign: 'center', lineHeight: 16 },
  sectionHeader: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  rxCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    marginBottom: 14,
  },
  rxTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  statusText: { fontSize: 10, fontWeight: '800', color: '#065f46' },
  doctorName: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  clinicName: { fontSize: 11, color: '#64748b', marginTop: 2 },
  medsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  medsHeading: { fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4 },
  medItem: { fontSize: 12, color: '#0f172a', lineHeight: 18 },
  reorderBtn: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  reorderText: { fontSize: 12, fontWeight: '700', color: '#0369a1' },
});
