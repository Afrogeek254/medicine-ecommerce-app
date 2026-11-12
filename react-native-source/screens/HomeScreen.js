import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Shield, Upload, Snowflake, Plus } from 'lucide-react-native';

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'prescription', name: 'Prescription (Rx)' },
  { id: 'chronic', name: 'Chronic Care' },
  { id: 'otc', name: 'Pain, Cold & OTC' },
  { id: 'derma', name: 'Skincare & Derma' },
  { id: 'wellness', name: 'Vitamins & Immunity' },
  { id: 'devices', name: 'Medical Devices' }
];

const MEDICINES = [
  {
    id: 'med-01',
    name: 'Augmentin 625mg Tablets',
    genericName: 'Amoxicillin (500mg) + Clavulanic (125mg)',
    isRx: true,
    price: 1850,
    originalPrice: 2400,
    category: 'prescription',
    coldChain: false,
    genericSavings: 'Save 49% with Grasha Generic'
  },
  {
    id: 'med-02',
    name: 'Coartem 80/480mg (Malaria)',
    genericName: 'Artemether + Lumefantrine (6 Tabs)',
    isRx: true,
    price: 650,
    originalPrice: 850,
    category: 'prescription',
    coldChain: false
  },
  {
    id: 'med-03',
    name: 'Lantus SoloStar Insulin Pen',
    genericName: 'Insulin Glargine 100 IU/ml (3ml)',
    isRx: true,
    price: 3600,
    originalPrice: 4500,
    category: 'chronic',
    coldChain: true,
    genericSavings: 'Save 33% with Biosimilar'
  },
  {
    id: 'med-06',
    name: 'Panadol Extra Tablets',
    genericName: 'Paracetamol (500mg) + Caffeine',
    isRx: false,
    price: 240,
    originalPrice: 300,
    category: 'otc',
    coldChain: false
  },
  {
    id: 'med-08',
    name: 'Brufen 400mg Tablets (Ibuprofen)',
    genericName: 'Ibuprofen BP 400mg (20 Tabs)',
    isRx: false,
    price: 380,
    originalPrice: 480,
    category: 'otc',
    coldChain: false,
    genericSavings: 'Save 53% with Generic'
  },
  {
    id: 'med-12',
    name: 'Grasha Effervescent Vitamin C',
    genericName: 'Ascorbic Acid 1000mg + Zinc (20 Tabs)',
    isRx: false,
    price: 650,
    originalPrice: 850,
    category: 'wellness',
    coldChain: false
  }
];

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedicines = MEDICINES.filter(m => {
    const matchCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchSearch = !searchQuery || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.locationBar}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={styles.brandTitle}>GrashaPhama</Text>
            <Text style={styles.ppbTag}>PPB KENYA</Text>
          </View>
          <Text style={styles.locationTitle}>📍 Deliver: Westlands, Nairobi ▼</Text>
        </View>
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => alert('Opening consultation with Pharm. Angela Muthoni, B.Pharm')}
        >
          <Text style={{ fontSize: 16 }}>💬</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Glossy Hero Banner (Prescription Upload) */}
        <View style={styles.heroBanner}>
          <View style={styles.heroBadge}>
            <Shield size={12} color="#ffffff" />
            <Text style={styles.heroBadgeText}>CAP. 499 Registered • Est. 2013</Text>
          </View>
          <Text style={styles.heroTitle}>Order with Doctor's Rx</Text>
          <Text style={styles.heroSubtitle}>
            Upload your prescription photo. Pharmacist verifies & dispatches order in 5 mins. Hand physical paper Rx to rider.
          </Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => navigation.navigate('Prescriptions')}
          >
            <Upload size={15} color="#1d4ed8" />
            <Text style={styles.uploadButtonText}>Upload Prescription Slip</Text>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Search size={18} color="#94a3b8" />
          <TextInput
            placeholder="Search Panadol, Augmentin, Insulin, Malaria..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Categories Horizontal Scroller */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextActive
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Pharmaceuticals</Text>
          <Text style={styles.sectionSubtitle}>{filteredMedicines.length} products</Text>
        </View>

        <View style={styles.gridContainer}>
          {filteredMedicines.map(med => (
            <TouchableOpacity 
              key={med.id} 
              style={styles.card}
              onPress={() => navigation.navigate('MedicineDetail', { medicine: med })}
            >
              <View style={styles.cardBadges}>
                <Text style={[styles.badgeText, med.isRx ? styles.rxBadge : styles.otcBadge]}>
                  {med.isRx ? 'Rx Required' : 'OTC'}
                </Text>
                {med.coldChain && (
                  <View style={styles.coldBadge}>
                    <Snowflake size={10} color="#06b6d4" />
                    <Text style={styles.coldText}>2-8°C</Text>
                  </View>
                )}
              </View>

              <View style={styles.iconPlaceholder}>
                <Text style={{ fontSize: 34 }}>{med.coldChain ? '💉' : (med.name.includes('Vitamin') ? '🍊' : '💊')}</Text>
              </View>

              <Text style={styles.medName} numberOfLines={1}>{med.name}</Text>
              <Text style={styles.medGeneric} numberOfLines={1}>{med.genericName}</Text>

              {med.genericSavings && (
                <Text style={styles.genericTag}>💡 {med.genericSavings}</Text>
              )}

              <View style={styles.priceRow}>
                <Text style={styles.priceText}>KES {med.price.toLocaleString()}</Text>
                {med.originalPrice && (
                  <Text style={styles.origPriceText}>KES {med.originalPrice.toLocaleString()}</Text>
                )}
              </View>

              <TouchableOpacity 
                style={styles.addCartBtn}
                onPress={() => alert(`Added ${med.name} to cart!`)}
              >
                <Plus size={13} color="#1d4ed8" />
                <Text style={styles.addCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ff' },
  locationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
  },
  brandTitle: { fontSize: 16, fontWeight: '900', color: '#1d4ed8' },
  ppbTag: { fontSize: 9, fontWeight: '800', backgroundColor: '#dcfce7', color: '#15803d', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4 },
  locationTitle: { fontSize: 11, fontWeight: '600', color: '#475569', marginTop: 1 },
  chatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { padding: 14 },
  heroBanner: {
    backgroundColor: '#1d4ed8',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
    gap: 4,
  },
  heroBadgeText: { color: '#ffffff', fontSize: 10, fontWeight: '800' },
  heroTitle: { color: '#ffffff', fontSize: 17, fontWeight: '900', marginBottom: 4 },
  heroSubtitle: { color: '#dbeafe', fontSize: 11.5, lineHeight: 16, marginBottom: 12 },
  uploadButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  uploadButtonText: { color: '#1d4ed8', fontSize: 12.5, fontWeight: '800' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0f172a' },
  categoryScroll: { marginBottom: 14 },
  categoryChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  categoryText: { fontSize: 11.5, fontWeight: '700', color: '#64748b' },
  categoryTextActive: { color: '#ffffff' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 14.5, fontWeight: '800', color: '#0f172a' },
  sectionSubtitle: { fontSize: 11.5, color: '#64748b' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: (Dimensions.get('window').width - 40) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 10,
    marginBottom: 12,
  },
  cardBadges: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  badgeText: { fontSize: 9, fontWeight: '800', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 },
  rxBadge: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  otcBadge: { backgroundColor: '#dcfce7', color: '#15803d' },
  coldBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  coldText: { fontSize: 9, color: '#06b6d4', fontWeight: '800' },
  iconPlaceholder: {
    height: 68,
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  medName: { fontSize: 12.5, fontWeight: '800', color: '#0f172a' },
  medGeneric: { fontSize: 10, color: '#64748b', marginBottom: 3 },
  genericTag: { fontSize: 9, color: '#059669', fontWeight: '800', marginVertical: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginVertical: 4 },
  priceText: { fontSize: 13.5, fontWeight: '900', color: '#1d4ed8' },
  origPriceText: { fontSize: 10, color: '#94a3b8', textDecorationLine: 'line-through' },
  addCartBtn: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 6,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  addCartText: { fontSize: 11, fontWeight: '800', color: '#1d4ed8' },
});
