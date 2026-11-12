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
import { Minus, Plus, ShieldCheck, AlertCircle } from 'lucide-react-native';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 'med-01',
      name: 'Augmentin 625mg Tablets',
      generic: 'Amoxicillin (500mg) + Clavulanic (125mg)',
      price: 1850,
      qty: 1,
      isRx: true
    },
    {
      id: 'med-06',
      name: 'Panadol Extra Tablets',
      generic: 'Paracetamol (500mg) + Caffeine',
      price: 240,
      qty: 2,
      isRx: false
    }
  ]);

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const delivery = subtotal >= 2500 ? 0 : 200; // MYDAWA & Grasha Pharma free delivery over KES 2,500
  const total = subtotal + delivery;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grasha Medical Cart ({cartItems.length} items)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Prescription Attached & Verified Notice */}
        <View style={styles.rxAttachedCard}>
          <ShieldCheck size={20} color="#10b981" />
          <View style={{ flex: 1 }}>
            <Text style={styles.rxAttachedTitle}>Prescription Verified & Attached</Text>
            <Text style={styles.rxAttachedSub}>Dr. David Mwangi, MBChB • Aga Khan University Hospital</Text>
            <Text style={{ fontSize: 9.5, color: '#047857', marginTop: 2 }}>
              * Remember to hand physical paper Rx to rider on delivery (PPB Kenya requirement).
            </Text>
          </View>
        </View>

        {/* Cart Item Cards */}
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartCard}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.isRx && <Text style={styles.rxBadge}>Rx</Text>}
              </View>
              <Text style={styles.itemGeneric}>{item.generic}</Text>
              <Text style={styles.itemPrice}>KES {(item.price * item.qty).toLocaleString()}</Text>
            </View>

            <View style={styles.qtyControl}>
              <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                <Minus size={13} color="#1d4ed8" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.qty}</Text>
              <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
                <Plus size={13} color="#1d4ed8" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Delivery Route */}
        <View style={styles.deliveryCard}>
          <Text style={styles.deliveryHead}>Delivery Network</Text>
          <Text style={styles.deliverySub}>Nairobi Express (Grasha Fleet 2-4 Hours)</Text>
          <Text style={styles.deliveryFee}>
            {delivery === 0 ? 'FREE DELIVERY (Orders > KES 2,500)' : 'KES 200 Standard Delivery'}
          </Text>
        </View>

        {/* Bill Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryVal}>KES {subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryVal}>{delivery === 0 ? 'FREE' : `KES ${delivery}`}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalVal}>KES {total.toLocaleString()}</Text>
          </View>
        </View>

        {/* M-Pesa Checkout Button */}
        <TouchableOpacity 
          style={styles.mpesaBtn}
          onPress={() => {
            Alert.alert(
              '📲 Lipa Na M-Pesa STK Push Sent',
              `Please enter your M-Pesa PIN on your phone to authorize payment of KES ${total.toLocaleString()} to Grasha Pharma Ltd (Paybill: 891200).`,
              [
                {
                  text: 'Confirm PIN Entered',
                  onPress: () => {
                    Alert.alert('Order Confirmed! 🚀', 'Your prescription order has been dispatched via Grasha Express Fleet.');
                    navigation.navigate('Track');
                  }
                }
              ]
            );
          }}
        >
          <Text style={styles.mpesaBtnText}>📱 Pay KES {total.toLocaleString()} with Lipa Na M-Pesa</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ff' },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
  },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  scroll: { padding: 14 },
  rxAttachedCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  rxAttachedTitle: { fontSize: 12, fontWeight: '800', color: '#065f46' },
  rxAttachedSub: { fontSize: 10.5, color: '#047857' },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemName: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  rxBadge: {
    fontSize: 9,
    fontWeight: '800',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  itemGeneric: { fontSize: 10.5, color: '#64748b', marginVertical: 2 },
  itemPrice: { fontSize: 13.5, fontWeight: '900', color: '#1d4ed8' },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: { padding: 4 },
  qtyText: { fontSize: 12, fontWeight: '800', minWidth: 16, textAlign: 'center' },
  deliveryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 12,
    marginBottom: 12,
  },
  deliveryHead: { fontSize: 12, fontWeight: '800', color: '#0f172a' },
  deliverySub: { fontSize: 11, color: '#64748b', marginTop: 1 },
  deliveryFee: { fontSize: 11, fontWeight: '700', color: '#059669', marginTop: 4 },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 14,
    marginBottom: 16,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryLabel: { fontSize: 12, color: '#64748b' },
  summaryVal: { fontSize: 12, fontWeight: '700', color: '#0f172a' },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#dbeafe',
    paddingTop: 8,
    marginTop: 6,
    marginBottom: 0,
  },
  totalLabel: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  totalVal: { fontSize: 16, fontWeight: '900', color: '#1d4ed8' },
  mpesaBtn: {
    backgroundColor: '#00a859',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#00a859',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  mpesaBtnText: { color: '#ffffff', fontSize: 13.5, fontWeight: '800' },
});
