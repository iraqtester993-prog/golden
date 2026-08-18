<template>
  <div class="page">
    <TopBar title="طلباتي" :showBack="true" />

    <div class="page-content">
      <!-- Empty State -->
      <div v-if="orders.length === 0" class="empty-state">
        <span class="material-symbols-outlined empty-icon">receipt_long</span>
        <span class="empty-text">لا توجد طلبات بعد</span>
        <span class="empty-sub">قم بتقديم طلب تقسيط وستظهر هنا</span>
        <button class="empty-btn" @click="$router.push('/settlements')">
          <span class="material-symbols-outlined">account_balance_wallet</span>
          <span>تسديد قسط</span>
        </button>
      </div>

      <!-- Orders List -->
      <template v-else>
        <!-- Tabs -->
        <div class="tabs-wrap">
          <div class="tabs">
            <button class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">الكل</button>
            <button class="tab" :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">قيد المراجعة</button>
            <button class="tab" :class="{ active: activeTab === 'inquiry' }" @click="activeTab = 'inquiry'">استعلام</button>
          </div>
          <div class="tabs">
            <button class="tab" :class="{ active: activeTab === 'approved' }" @click="activeTab = 'approved'">تم الموافقة</button>
            <button class="tab" :class="{ active: activeTab === 'shipping' }" @click="activeTab = 'shipping'">قيد التوصيل</button>
            <button class="tab" :class="{ active: activeTab === 'delivered' }" @click="activeTab = 'delivered'">تم التسليم</button>
          </div>
        </div>

        <div class="orders-list">
          <div v-for="order in filteredOrders" :key="order.id" class="order-card" @click="openDetail(order)">
            <div class="order-header">
              <div class="order-id-wrap">
                <span class="order-id">#{{ order.id }}</span>
                <span class="order-date">{{ order.date }}</span>
              </div>
              <span class="status-badge" :class="'status-' + order.status">{{ statusLabel(order.status) }}</span>
            </div>
            <!-- Close Invoice Type -->
            <template v-if="order.type === 'close_invoice'">
              <div class="close-inv-info">
                <span class="material-symbols-outlined" style="font-size:28px;color:var(--primary)">receipt_long</span>
                <div>
                  <span class="close-inv-name">طلب إطفاء فاتورة</span>
                  <span class="close-inv-ref">{{ order.invoiceName }} (#{{ order.invoiceId }})</span>
                </div>
              </div>
              <div class="order-footer">
                <div class="order-total">
                  <span class="order-total-label">المبلغ المتبقي</span>
                  <span class="order-total-value">{{ order.remaining }} د.ع</span>
                </div>
                <span class="material-symbols-outlined order-arrow">chevron_left</span>
              </div>
            </template>
            <!-- Regular Installment Order -->
            <template v-else>
              <div class="order-products">
                <div v-for="(p, i) in order.products.slice(0, 3)" :key="i" class="order-product-row">
                  <img :src="p.img" class="order-product-img" />
                  <div class="order-product-info">
                    <span class="order-product-name">{{ p.name }}</span>
                    <span class="order-product-price">{{ p.price }} د.ع</span>
                  </div>
                </div>
                <div v-if="order.products.length > 3" class="order-more">+{{ order.products.length - 3 }} منتج آخر</div>
              </div>
              <div class="order-footer">
                <div class="order-total">
                  <span class="order-total-label">القسط الشهري</span>
                  <span class="order-total-value">{{ formatNum(order.monthlyInstallment) }} د.ع</span>
                </div>
                <span class="material-symbols-outlined order-arrow">chevron_left</span>
              </div>
            </template>
            <!-- Owner Note Preview -->
            <div v-if="order.ownerNote" class="order-note-preview">
              <span class="material-symbols-outlined">chat</span>
              <span>{{ order.ownerNote }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Detail Sheet -->
    <div v-if="detailOrder" class="sheet-overlay" @click.self="detailOrder = null">
      <div class="sheet">
        <div class="sheet-handle" @click="detailOrder = null"><div class="handle-bar"></div></div>
        <div class="sheet-scroll">
          <!-- Status Timeline -->
          <div class="detail-timeline">
            <div v-for="(step, i) in statusSteps" :key="i" class="timeline-step" :class="{ active: i <= statusIndex(detailOrder.status), done: i < statusIndex(detailOrder.status) }">
              <div class="timeline-dot">
                <span class="material-symbols-outlined" v-if="i < statusIndex(detailOrder.status)">check</span>
                <span v-else-if="i === statusIndex(detailOrder.status)" class="timeline-pulse"></span>
              </div>
              <div class="timeline-line" v-if="i < statusSteps.length - 1"></div>
              <div class="timeline-info">
                <span class="timeline-label">{{ step.label }}</span>
                <span class="timeline-date" v-if="i <= statusIndex(detailOrder.status)">{{ orderDate(detailOrder, i) }}</span>
              </div>
            </div>
          </div>

          <!-- Order Info -->
          <div class="detail-section">
            <h3 class="detail-heading">
              <span class="material-symbols-outlined">info</span>
              معلومات الطلب
            </h3>
            <div class="detail-row"><span class="detail-key">رقم الطلب</span><span class="detail-val">#{{ detailOrder.id }}</span></div>
            <div class="detail-row"><span class="detail-key">تاريخ التقديم</span><span class="detail-val">{{ detailOrder.date }}</span></div>
            <div class="detail-row"><span class="detail-key">نوع الطلب</span><span class="detail-val">{{ detailOrder.type === 'close_invoice' ? 'إطفاء فاتورة' : 'طلب أقساط' }}</span></div>
            <div v-if="detailOrder.type !== 'close_invoice'" class="detail-row"><span class="detail-key">المنتجات</span><span class="detail-val">{{ detailOrder.products?.length || 0 }} منتجات</span></div>
          </div>

          <!-- Close Invoice Info -->
          <template v-if="detailOrder.type === 'close_invoice'">
            <div class="detail-section">
              <h3 class="detail-heading">
                <span class="material-symbols-outlined">receipt_long</span>
                تفاصيل الفاتورة
              </h3>
              <div class="detail-row"><span class="detail-key">اسم الفاتورة</span><span class="detail-val">{{ detailOrder.invoiceName }}</span></div>
              <div class="detail-row"><span class="detail-key">رقم الفاتورة</span><span class="detail-val">#{{ detailOrder.invoiceId }}</span></div>
              <div class="detail-row"><span class="detail-key">المبلغ المتبقي</span><span class="detail-val">{{ detailOrder.remaining }} د.ع</span></div>
              <div class="detail-row"><span class="detail-key">عدد الأقساط المتبقية</span><span class="detail-val">{{ detailOrder.installmentsLeft }} قسط</span></div>
            </div>
          </template>

          <!-- Products (regular orders only) -->
          <template v-else>
            <div class="detail-section">
              <h3 class="detail-heading">
                <span class="material-symbols-outlined">shopping_bag</span>
                المنتجات
              </h3>
              <div v-for="(p, i) in detailOrder.products" :key="i" class="detail-product-row">
                <img :src="p.img" class="detail-product-img" />
                <div class="detail-product-info">
                  <span class="detail-product-name">{{ p.name }}</span>
                  <span class="detail-product-spec">{{ p.spec }}</span>
                </div>
                <span class="detail-product-price">{{ p.price }} د.ع</span>
              </div>
            </div>
          </template>

          <!-- Personal Info -->
          <div class="detail-section">
            <h3 class="detail-heading">
              <span class="material-symbols-outlined">person</span>
              البيانات الشخصية
            </h3>
            <div class="detail-row"><span class="detail-key">الاسم الكامل</span><span class="detail-val">{{ detailOrder.fullName }}</span></div>
            <div class="detail-row"><span class="detail-key">رقم الهاتف</span><span class="detail-val" dir="ltr">{{ detailOrder.phone }}</span></div>
            <div v-if="detailOrder.address" class="detail-row"><span class="detail-key">العنوان</span><span class="detail-val">{{ detailOrder.address }}</span></div>
            <div v-if="detailOrder.salary" class="detail-row"><span class="detail-key">الراتب الشهري</span><span class="detail-val">{{ formatNum(detailOrder.salary) }} د.ع</span></div>
            <div v-if="detailOrder.clientType" class="detail-row"><span class="detail-key">نوع العميل</span><span class="detail-val">{{ detailOrder.clientType === 'employee' ? 'موظف' : 'تاجر' }}</span></div>
          </div>

          <!-- Payment Details (regular orders only) -->
          <template v-if="detailOrder.type !== 'close_invoice'">
            <div class="detail-section">
              <h3 class="detail-heading">
                <span class="material-symbols-outlined">payments</span>
                تفاصيل الدفع
              </h3>
              <div class="detail-row"><span class="detail-key">إجمالي المنتجات</span><span class="detail-val">{{ formatNum(detailOrder.totalPrice) }} د.ع</span></div>
              <div class="detail-row" v-if="detailOrder.downPayment > 0"><span class="detail-key">المبلغ المقدم</span><span class="detail-val">{{ formatNum(detailOrder.downPayment) }} د.ع</span></div>
              <div class="detail-row"><span class="detail-key">المبلغ الصافي</span><span class="detail-val">{{ formatNum(detailOrder.netAmount) }} د.ع</span></div>
              <div class="detail-row"><span class="detail-key">مدة التقسيط</span><span class="detail-val">{{ detailOrder.months }} شهر</span></div>
              <div class="detail-row highlight"><span class="detail-key">القسط الشهري</span><span class="detail-val">{{ formatNum(detailOrder.monthlyInstallment) }} د.ع</span></div>
              <div class="detail-row"><span class="detail-key">الإجمالي الكلي</span><span class="detail-val">{{ formatNum(detailOrder.totalAmount) }} د.ع</span></div>
            </div>
          </template>

          <!-- Owner Notes -->
          <div v-if="detailOrder.ownerNote" class="detail-section owner-note-section">
            <h3 class="detail-heading">
              <span class="material-symbols-outlined">chat</span>
              ملاحظة من الإدارة
            </h3>
            <div class="owner-note-box">
              <span class="owner-note-text">{{ detailOrder.ownerNote }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="detail-actions" v-if="detailOrder.status === 'pending' || detailOrder.status === 'review'">
            <button class="action-btn edit-btn" @click="startEdit(detailOrder)">
              <span class="material-symbols-outlined">edit</span>
              <span>تعديل الطلب</span>
            </button>
            <button class="action-btn cancel-btn" @click="confirmCancel(detailOrder)">
              <span class="material-symbols-outlined">cancel</span>
              <span>إلغاء الطلب</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Sheet -->
    <div v-if="editingOrder" class="sheet-overlay" @click.self="editingOrder = null">
      <div class="sheet">
        <div class="sheet-handle" @click="editingOrder = null"><div class="handle-bar"></div></div>
        <div class="sheet-scroll">
          <div class="edit-header">
            <span class="material-symbols-outlined">edit</span>
            <span>تعديل الطلب #{{ editingOrder.id }}</span>
          </div>

          <div class="edit-section">
            <label class="edit-label">الاسم الكامل</label>
            <input v-model="editForm.fullName" class="edit-input" type="text" />
          </div>
          <div class="edit-section">
            <label class="edit-label">رقم الهاتف</label>
            <input v-model="editForm.phone" class="edit-input" type="tel" dir="ltr" />
          </div>
          <div class="edit-section">
            <label class="edit-label">العنوان</label>
            <input v-model="editForm.address" class="edit-input" type="text" />
          </div>
          <div class="edit-section">
            <label class="edit-label">الراتب الشهري (د.ع)</label>
            <input v-model.number="editForm.salary" class="edit-input" type="number" />
          </div>
          <div class="edit-section">
            <label class="edit-label">المبلغ المقدم (د.ع)</label>
            <input v-model.number="editForm.downPayment" class="edit-input" type="number" />
          </div>
          <div class="edit-section">
            <label class="edit-label">مدة التقسيط</label>
            <div class="edit-duration-grid">
              <button v-for="m in durations" :key="m" class="edit-dur-btn" :class="{ active: editForm.months === m }" @click="editForm.months = m">
                <span>{{ m }} شهر</span>
              </button>
            </div>
          </div>

          <div class="edit-actions">
            <button class="edit-save-btn" @click="saveEdit">
              <span class="material-symbols-outlined">save</span>
              <span>حفظ التعديلات</span>
            </button>
            <button class="edit-cancel-btn" @click="editingOrder = null">إلغاء</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Confirm Dialog -->
    <div v-if="cancelTarget" class="dialog-overlay" @click.self="cancelTarget = null">
      <div class="dialog">
        <span class="material-symbols-outlined dialog-icon">warning</span>
        <h3 class="dialog-title">إلغاء الطلب</h3>
        <p class="dialog-text">هل أنت متأكد من إلغاء الطلب #{{ cancelTarget.id }}؟ لا يمكن التراجع عن هذا الإجراء.</p>
        <div class="dialog-actions">
          <button class="dialog-confirm" @click="doCancel">نعم، إلغاء</button>
          <button class="dialog-dismiss" @click="cancelTarget = null">احتفاظ بالطلب</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast" class="toast" :class="'toast-' + toast.type">
      <span class="material-symbols-outlined">{{ toast.type === 'success' ? 'check_circle' : 'error' }}</span>
      <span>{{ toast.msg }}</span>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="item in navItems" :key="item.label" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon">{{ item.icon }}</span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const goTo = (r) => { if (r) router.push(r) }

const activeTab = ref('all')
const detailOrder = ref(null)
const editingOrder = ref(null)
const editForm = ref({})
const cancelTarget = ref(null)
const toast = ref(null)
const durations = [10, 16, 18, 24, 36]

const statusSteps = [
  { label: 'قيد المراجعة', key: 'pending' },
  { label: 'استعلام دائرة الزبون', key: 'inquiry' },
  { label: 'تم الموافقة', key: 'approved' },
  { label: 'قيد التوصيل', key: 'shipping' },
  { label: 'تم التوصيل', key: 'delivered' }
]

const statusIndex = (s) => statusSteps.findIndex(st => st.key === s)

const statusLabel = (s) => {
  const map = {
    pending: 'قيد المراجعة',
    inquiry: 'استعلام دائرة الزبون',
    approved: 'تم الموافقة',
    shipping: 'قيد التوصيل',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي'
  }
  return map[s] || s
}

const orders = ref(JSON.parse(localStorage.getItem('golden_orders') || '[]'))

const saveOrders = () => {
  localStorage.setItem('golden_orders', JSON.stringify(orders.value))
}

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  return orders.value.filter(o => o.status === activeTab.value)
})

const openDetail = (order) => { detailOrder.value = order }

const orderDate = (order, stepIdx) => {
  if (stepIdx === 0) return order.date
  const d = new Date(order.date)
  d.setDate(d.getDate() + stepIdx * 2)
  return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatNum = (n) => Number(n).toLocaleString('en')

const startEdit = (order) => {
  editForm.value = {
    fullName: order.fullName,
    phone: order.phone,
    address: order.address,
    salary: order.salary,
    downPayment: order.downPayment,
    months: order.months
  }
  editingOrder.value = order
}

const saveEdit = () => {
  const o = orders.value.find(ord => ord.id === editingOrder.value.id)
  if (o) {
    Object.assign(o, {
      fullName: editForm.value.fullName,
      phone: editForm.value.phone,
      address: editForm.value.address,
      salary: editForm.value.salary,
      downPayment: editForm.value.downPayment,
      months: editForm.value.months,
      monthlyInstallment: Math.ceil((o.totalPrice - editForm.value.downPayment) / editForm.value.months),
      totalAmount: Math.ceil((o.totalPrice - editForm.value.downPayment) / editForm.value.months) * editForm.value.months
    })
    saveOrders()
    detailOrder.value = o
    editingOrder.value = null
    showToast('تم حفظ التعديلات بنجاح', 'success')
  }
}

const confirmCancel = (order) => { cancelTarget.value = order }

const doCancel = () => {
  const o = orders.value.find(ord => ord.id === cancelTarget.value.id)
  if (o) {
    o.status = 'cancelled'
    saveOrders()
    detailOrder.value = o
    cancelTarget.value = null
    showToast('تم إلغاء الطلب', 'success')
  }
}

const showToast = (msg, type) => {
  toast.value = { msg, type }
  setTimeout(() => { toast.value = null }, 2500)
}

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }
.page-content { flex: 1; overflow-y: auto; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 12px; }
.page-content > * { flex-shrink: 0; }

/* Empty */
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 60px 0; }
.empty-icon { font-size: 64px; color: var(--on-surface-variant); opacity: 0.3; }
.empty-text { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.empty-sub { font-size: 13px; color: var(--on-surface-variant); }
.empty-btn { display: flex; align-items: center; gap: 8px; margin-top: 8px; padding: 12px 24px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 14px; font-weight: 700; font-family: inherit; cursor: pointer; }
.empty-btn .material-symbols-outlined { font-size: 20px; }

/* Tabs */
.tabs-wrap { display: flex; flex-direction: column; gap: 0; }
.tabs { display: flex; }
.tab { flex: 1; background: none; border: none; border-bottom: 2px solid transparent; padding: 10px 0; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); cursor: pointer; font-family: inherit; transition: all 0.2s; white-space: nowrap; }
.tab.active { color: var(--primary); border-bottom-color: var(--primary); }

/* Orders List */
.orders-list { display: flex; flex-direction: column; gap: 10px; }
.order-card { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 14px; cursor: pointer; transition: border-color 0.2s; }
.order-card:active { border-color: var(--primary); }
.order-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.order-id-wrap { display: flex; flex-direction: column; gap: 2px; }
.order-id { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.order-date { font-size: 11px; color: var(--on-surface-variant); }

/* Status Badge */
.status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.status-pending { background: rgba(255, 183, 77, 0.15); color: #ffb74d; }
.status-inquiry { background: rgba(100, 181, 246, 0.15); color: #64b5f6; }
.status-approved { background: rgba(129, 199, 132, 0.15); color: #81c784; }
.status-shipping { background: rgba(186, 104, 200, 0.15); color: #ba68c8; }
.status-delivered { background: rgba(242, 202, 80, 0.15); color: #f2ca50; }
.status-cancelled { background: rgba(239, 83, 80, 0.15); color: #ef5350; }

/* Order Products */
.close-inv-info { display: flex; align-items: center; gap: 12px; padding: 8px 0; }
.close-inv-name { font-size: 14px; font-weight: 700; color: var(--on-surface); display: block; }
.close-inv-ref { font-size: 12px; color: var(--on-surface-variant); }
.order-products { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
.order-product-row { display: flex; align-items: center; gap: 10px; }
.order-product-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
.order-product-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.order-product-name { font-size: 13px; font-weight: 600; color: var(--on-surface); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.order-product-price { font-size: 12px; color: var(--on-surface-variant); }
.order-more { font-size: 12px; color: var(--on-surface-variant); text-align: center; padding: 4px; }

/* Order Footer */
.order-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--outline-variant); }
.order-total-label { font-size: 12px; color: var(--on-surface-variant); display: block; }
.order-total-value { font-size: 16px; font-weight: 800; color: var(--primary); }
.order-arrow { font-size: 22px; color: var(--on-surface-variant); }

/* Order Note Preview */
.order-note-preview { display: flex; align-items: center; gap: 6px; margin-top: 8px; padding: 8px 10px; background: rgba(99, 179, 237, 0.08); border: 1px solid rgba(99, 179, 237, 0.2); border-radius: 10px; font-size: 12px; color: #63b3ed; }
.order-note-preview .material-symbols-outlined { font-size: 16px; }

/* Detail Sheet */
.sheet-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
.sheet { width: 100%; max-width: 480px; max-height: 90vh; background: var(--bg); border-radius: 20px 20px 0 0; display: flex; flex-direction: column; animation: slideUp 0.25s ease; }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px; cursor: pointer; }
.handle-bar { width: 40px; height: 4px; border-radius: 2px; background: var(--outline-variant); }
.sheet-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 0 16px 20px; }

/* Timeline */
.detail-timeline { padding: 16px 0; }
.timeline-step { display: flex; align-items: flex-start; gap: 12px; position: relative; padding-bottom: 20px; }
.timeline-step:last-child { padding-bottom: 0; }
.timeline-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--surface-container); border: 2px solid var(--outline-variant); display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1; }
.timeline-step.active .timeline-dot { border-color: var(--primary); background: rgba(242, 202, 80, 0.1); }
.timeline-step.done .timeline-dot { border-color: var(--primary); background: var(--primary); }
.timeline-dot .material-symbols-outlined { font-size: 16px; color: #0a0f1d; }
.timeline-pulse { width: 10px; height: 10px; border-radius: 50%; background: var(--primary); animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.6; } }
.timeline-line { position: absolute; top: 28px; left: 13px; width: 2px; height: calc(100% - 28px); background: var(--outline-variant); }
.timeline-step.done .timeline-line { background: var(--primary); }
.timeline-info { flex: 1; }
.timeline-label { font-size: 13px; font-weight: 600; color: var(--on-surface-variant); display: block; }
.timeline-step.active .timeline-label { color: var(--primary); font-weight: 700; }
.timeline-step.done .timeline-label { color: var(--on-surface-variant); }
.timeline-date { font-size: 11px; color: var(--on-surface-variant); }

/* Detail Sections */
.detail-section { background: var(--surface-container); border-radius: 14px; padding: 14px; margin-top: 10px; }
.detail-heading { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--on-surface); margin-bottom: 12px; }
.detail-heading .material-symbols-outlined { font-size: 20px; color: var(--primary); }
.detail-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--outline-variant); }
.detail-row:last-child { border-bottom: none; }
.detail-row.highlight { background: rgba(242, 202, 80, 0.06); margin: 4px -8px; padding: 10px 8px; border-radius: 10px; border-bottom: none; }
.detail-key { font-size: 13px; color: var(--on-surface-variant); }
.detail-val { font-size: 13px; font-weight: 600; color: var(--on-surface); }
.detail-row.highlight .detail-val { color: var(--primary); font-weight: 800; font-size: 15px; }

/* Detail Products */
.detail-product-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
.detail-product-row + .detail-product-row { border-top: 1px solid var(--outline-variant); }
.detail-product-img { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.detail-product-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.detail-product-name { font-size: 13px; font-weight: 600; color: var(--on-surface); }
.detail-product-spec { font-size: 11px; color: var(--on-surface-variant); }
.detail-product-price { font-size: 13px; font-weight: 600; color: var(--primary); }

/* Owner Note */
.owner-note-section { border: 1px solid rgba(99, 179, 237, 0.25); }
.owner-note-box { background: rgba(99, 179, 237, 0.06); border-radius: 12px; padding: 12px; }
.owner-note-text { font-size: 13px; line-height: 1.8; color: var(--on-surface); }

/* Detail Actions */
.detail-actions { display: flex; gap: 10px; margin-top: 14px; }
.action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; border-radius: 14px; border: none; font-size: 14px; font-weight: 700; font-family: inherit; cursor: pointer; }
.action-btn .material-symbols-outlined { font-size: 20px; }
.edit-btn { background: var(--surface-container); border: 1px solid var(--outline-variant); color: var(--on-surface); }
.cancel-btn { background: rgba(239, 83, 80, 0.1); border: 1px solid rgba(239, 83, 80, 0.25); color: #ef5350; }

/* Edit Sheet */
.edit-header { display: flex; align-items: center; gap: 8px; padding: 16px 0 12px; font-size: 16px; font-weight: 700; color: var(--on-surface); }
.edit-header .material-symbols-outlined { font-size: 22px; color: var(--primary); }
.edit-section { margin-bottom: 14px; }
.edit-label { display: block; font-size: 13px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 6px; }
.edit-input { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--outline-variant); background: var(--surface-container); color: var(--on-surface); font-size: 14px; font-family: inherit; outline: none; }
.edit-input:focus { border-color: var(--primary); }
.edit-duration-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.edit-dur-btn { padding: 10px 4px; border-radius: 10px; background: var(--surface-container); border: 2px solid var(--outline-variant); font-size: 12px; font-weight: 600; color: var(--on-surface); cursor: pointer; font-family: inherit; text-align: center; }
.edit-dur-btn.active { border-color: var(--primary); background: rgba(242, 202, 80, 0.08); color: var(--primary); }
.edit-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.edit-save-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 15px; font-weight: 700; font-family: inherit; cursor: pointer; }
.edit-save-btn .material-symbols-outlined { font-size: 20px; }
.edit-cancel-btn { padding: 12px; border-radius: 14px; background: none; border: 1px solid var(--outline-variant); color: var(--on-surface-variant); font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; text-align: center; }

/* Dialog */
.dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 150; display: flex; align-items: center; justify-content: center; padding: 24px; }
.dialog { width: 100%; max-width: 360px; background: var(--bg); border-radius: 20px; padding: 24px; text-align: center; animation: slideUp 0.2s ease; }
.dialog-icon { font-size: 48px; color: #ef5350; }
.dialog-title { font-size: 18px; font-weight: 700; color: var(--on-surface); margin: 10px 0 6px; }
.dialog-text { font-size: 13px; line-height: 1.7; color: var(--on-surface-variant); margin-bottom: 20px; }
.dialog-actions { display: flex; gap: 10px; }
.dialog-confirm { flex: 1; padding: 12px; border-radius: 12px; background: #ef5350; border: none; color: #fff; font-size: 14px; font-weight: 700; font-family: inherit; cursor: pointer; }
.dialog-dismiss { flex: 1; padding: 12px; border-radius: 12px; background: var(--surface-container); border: 1px solid var(--outline-variant); color: var(--on-surface); font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; }

/* Toast */
.toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 14px; font-size: 13px; font-weight: 600; z-index: 200; animation: slideUp 0.2s ease; white-space: nowrap; }
.toast-success { background: var(--primary); color: #0a0f1d; }
.toast-error { background: #ef5350; color: #fff; }
.toast .material-symbols-outlined { font-size: 20px; }

/* Bottom Nav */
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-icon { font-size: 24px; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
