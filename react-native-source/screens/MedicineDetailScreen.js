import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, ArrowRight, Plus } from 'lucide-react-native';

export default function MedicineDetailScreen({ route, navigation }) {
  const medicine = route?.params?.medicine || {
    id: 'med-01',
    name: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin (500mg) + Potassium Clavulanate (125mg)',
    isRx: true,
    price: 18.50,
    originalPrice: 24.00,
    genericSavings: 'Save 52% with Generic',
    dosage: '1 tablet twice daily after meals with plenty of water.',
    warnings: 'Complete full course. Avoid if allergic to penicillin.',
    manufacturer: 'GlaxoSmithKline'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Visual Box */}
        <View style={styles.imageBox}>
          <Text style={{ fontSize: 64 }}>💊</Text>
          <Text style={styles.mfgText}>Manufacturer: {medicine.manufacturer}</Text>
        </View>

        {/* Title & Generic Name */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{medicine.name}</Text>
          <Text style={styles.genericText}>{medicine.genericName}</Text>
          <View style={styles.badgeRow}>
            <Text style={[styles.badge, medicine.isRx ? styles.rxBadge : styles.otcBadge]}>
              {medicine.isRx ? 'Prescription Required (Rx)' : 'Over The Counter (OTC)'}
            </Text>
          </View>
        </View>

        {/* Generic Alternative Savings Banner */}
        {medicine.genericSavings && (
          <View style={styles.genericCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.genericTitle}>💡 Lower Cost Generic Available</Text>
              <Text style={styles.genericSub}>
                Exact same active composition & therapeutic effect, approved by FDA.
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.switchBtn}
              onPress={() => alert('Switched to FDA approved generic equivalent! You saved $9.60')}
            >
              <Text style={styles.switchBtnText}>Switch</Text>
              <ArrowRight size={12} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Medical Indications & Dosage */}
        <View style={styles.infoBlock}>
          <Text style={styles.infoHeading}>Directions & Dosage</Text>
          <Text style={styles.infoBody}>{medicine.dosage}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoHeading}>Safety & Warnings</Text>
          <Text style={[styles.infoBody, { color: '#b91c1c' }]}>{medicine.warnings}</Text>
        </View>

      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceVal}>${medicine.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartBtn}
          onPress={() => {
            alert(`Added ${medicine.name} to cart!`);
            navigation.navigate('Cart');
          }}
        >
          <Plus size={16} color="#ffffff" />
          <Text style={styles.addToCartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16, paddingBottom: 100 },
  imageBox: {
    height: 160,
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mfgText: { fontSize: 11, color: '#0369a1', marginTop: 8, fontWeight: '600' },
  titleSection: { marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  genericText: { fontSize: 13, color: '#0284c7', fontWeight: '600', marginTop: 4 },
  badgeRow: { flexDirection: 'row', marginTop: 8 },
  badge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  rxBadge: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  otcBadge: { backgroundColor: '#dcfce7', color: '#15803d' },
  genericCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderWidth: 1.5,
    borderColor: '#10b981',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  genericTitle: { fontSize: 12, fontWeight: '800', color: '#065f46' },
  genericSub: { fontSize: 11, color: '#047857', marginTop: 2 },
  switchBtn: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  switchBtnText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  infoBlock: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 12,
  },
  infoHeading: { fontSize: 13, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  infoBody: { fontSize: 12, color: '#475569', lineHeight: 18 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: { fontSize: 10, color: '#64748b', textTransform: 'uppercase' },
  priceVal: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  addToCartBtn: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  addToCartBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
});
