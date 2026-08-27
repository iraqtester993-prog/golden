import { ref } from 'vue'

const savedLanguage = localStorage.getItem('golden_language')
const language = ref(savedLanguage === 'en' ? 'en' : 'ar')

// The app was built with Arabic copy in its components.  Keeping the dictionary
// here lets the existing screens switch language without duplicating every view.
const arToEn = {
  'الرئيسية': 'Home', 'المتجر': 'Store', 'أقساطي': 'My Installments', 'طلباتي': 'My Orders', 'حسابي': 'My Account',
  'اللغة': 'Language', 'العربية': 'العربية', 'الإنكليزية': 'English', 'البيانات الشخصية': 'Personal information',
  'المفضلة': 'Favorites', 'مركز الدعم الفني': 'Support center', 'نحن هنا لمساعدتك': 'We are here to help',
  'تابعنا على': 'Follow us', 'الشروط والأحكام': 'Terms and conditions', 'سياسة الخصوصية': 'Privacy policy',
  'تسجيل الخروج': 'Sign out', 'الإصدار 1.0.0': 'Version 1.0.0', 'لم يتم التسجيل': 'Not registered',
  'الموضوع': 'Subject', 'الرسالة': 'Message', 'موضوع الرسالة': 'Message subject', 'اكتب رسالتك هنا...': 'Write your message here...',
  'إرسال الرسالة': 'Send message', 'تسجيل الدخول': 'Sign in', 'إنشاء حساب': 'Create account', 'دخول كضيف': 'Continue as guest',
  'رجوع': 'Back', 'التالي': 'Next', 'تخطي': 'Skip', 'حسناً': 'OK', 'إلغاء': 'Cancel', 'إغلاق': 'Close',
  'المعلومات الشخصية': 'Personal information', 'المعلومات الوظيفية': 'Employment information', 'المستمسكات': 'Documents',
  'الاسم الكامل': 'Full name', 'رقم الهاتف': 'Phone number', 'رقم البطاقة الوطنية': 'National ID number', 'تاريخ الميلاد': 'Date of birth',
  'العنوان': 'Address', 'كلمة المرور': 'Password', 'موظف حكومي': 'Government employee', 'قطاع خاص': 'Private sector',
  'اسم الدائرة': 'Department name', 'المسمى الوظيفي': 'Job title', 'المهنة': 'Profession', 'جهة العمل': 'Workplace', 'اسم النشاط': 'Business name',
  'الصورة الشخصية': 'Profile photo', 'التقاط صورة': 'Take photo', 'من الهاتف': 'From phone', 'اختيار صورة': 'Choose image',
  'البطاقة الوطنية - الوجه الأمامي': 'National ID — front', 'البطاقة الوطنية - الوجه الخلفي': 'National ID — back',
  'بطاقة السكن': 'Residence card', 'هوية الدائرة': 'Department ID', 'هوية الدائرة (اختيارية)': 'Department ID (optional)',
  'أوافق على شروط الاستخدام وسياسة الخصوصية': 'I agree to the Terms of Use and Privacy Policy',
  'الكل': 'All', 'الأقسام الرئيسية': 'Main categories', 'إلكترونيات': 'Electronics', 'مركبات': 'Vehicles', 'المنزل': 'Home & Living',
  'هواتف': 'Phones', 'تلفزيونات': 'Televisions', 'سيارات': 'Cars', 'شاحنات': 'Trucks', 'مكيفات': 'Air conditioners',
  'أجهزة منزلية': 'Home appliances', 'العروض': 'Offers', 'الجديد': 'New', 'الأكثر مبيعاً': 'Best sellers', 'ابحث عن منتج...': 'Search products...',
  'عرض التفاصيل': 'View details', 'يدعم التقسيط': 'Installments available', 'إضافة إلى السلة': 'Add to cart', 'السلة': 'Cart',
  'المبلغ الكلي': 'Total amount', 'المبلغ المتبقي': 'Remaining amount', 'عدد الأقساط الكلية': 'Total installments',
  'عدد الأقساط المتبقية': 'Remaining installments', 'تاريخ القسط القادم': 'Next installment date', 'كشف حساب': 'Statement',
  'طلب جديد': 'New request', 'إطفاء فاتورة': 'Close invoice', 'حاسبة التقسيط': 'Installment calculator',
  'فعالة': 'Active', 'منتهية': 'Completed', 'مدفوع': 'Paid', 'غير مدفوع': 'Unpaid', 'مستحق الدفع': 'Due',
  'متلكئ': 'Overdue', 'مدفوع جزئي': 'Partially paid', 'آخر الحركات': 'Recent activity', 'عرض الكل': 'View all',
  'الماركات': 'Brands', 'الفروع': 'Branches', 'الوكلاء': 'Agents', 'المنتجات': 'Products', 'تفاصيل المنتج': 'Product details',
  'شراء': 'Buy', 'شراء بالتقسيط': 'Buy on installments', 'تم إرسال الطلب': 'Request sent', 'بحث': 'Search',
  'مرفوض': 'Rejected', 'تم رفض الطلب': 'Request rejected', 'تم رفض الطلب. يرجى مراجعة الإدارة لمعرفة السبب.': 'This request was rejected. Please contact management for the reason.',
  'التواصل مع الإدارة': 'Contact management', 'اكتب استفسارك بخصوص الطلب': 'Write your inquiry about request', 'وسيُرسل إلى الإدارة.': 'and it will be sent to management.',
  'اكتب رسالتك هنا...': 'Write your message here...', 'تم إرسال رسالتك إلى الإدارة': 'Your message was sent to management',
  'يرجى ارفاق تأييد راتب لآخر شهرين': 'Please attach salary confirmation for the last two months.', 'يرجى ارفاق مستمسك أصلي': 'Please attach an original document.',
  'يرجى إرفاق تأييد راتب لآخر شهرين.': 'Please attach salary confirmation for the last two months.', 'يرجى إرفاق المستمسك الأصلي بصورة واضحة.': 'Please attach a clear photo of the original document.',
  'رفض بسبب عدم كفاية الراتب.': 'Rejected due to insufficient salary.',
  'رفض بسبب عدم أهلية الزبون': 'Rejected due to customer ineligibility.', 'رفض بسبب عدم كفاية الراتب': 'Rejected due to insufficient salary.',
  'يوم': 'day', 'شهر': 'month', 'سنة': 'year', 'د.ع': 'IQD', 'قسط': 'installment',
  'اختر الفاتورة': 'Choose invoice', 'فاتورة': 'Invoice', 'الخدمات': 'Services', 'المزيد': 'More',
  'تسديد قسط': 'Pay installment', 'العودة للماركات': 'Back to brands', 'فروع الشركة': 'Company branches',
  'الوكلاء المعتمدون': 'Authorized agents', 'رجوع للقائمة': 'Back to list', 'التواصل': 'Contact', 'واتساب': 'WhatsApp',
  'سلة المنتجات': 'Shopping cart', 'السلة فارغة حالياً': 'Your cart is empty', 'الذهاب إلى المتجر': 'Go to store',
  'إلغاء الكل': 'Remove all', 'حذف المنتج': 'Remove product', 'الإجمالي': 'Total', 'شراء نقد': 'Pay in cash',
  'حساب الأقساط': 'Calculate installments', 'الوصف': 'Description', 'المواصفات': 'Specifications',
  'شروط الاستخدام وسياسة الخصوصية': 'Terms of Use and Privacy Policy', 'شروط الاستخدام': 'Terms of Use',
  'أوافق': 'I agree', 'سيتم تقديم طلب لتسديد كامل المبالغ المتبقية على الفاتورة المحددة.': 'A request will be submitted to settle the selected invoice in full.',
  'تقديم الطلب': 'Submit request', 'المنتج': 'Product', 'رقم الفاتورة': 'Invoice number', 'القسط الشهري': 'Monthly installment',
  'إجمالي الأقساط': 'Total installments', 'الأقساط المدفوعة': 'Paid installments', 'الأقساط المتبقية': 'Remaining installments',
  'المدة المتبقية': 'Remaining period', 'جدول الأقساط': 'Installment schedule', 'سيتم مراجعة طلب إطفاء الفاتورة من قبل الإدارة.': 'Your invoice-closing request will be reviewed by management.',
  'كل الحركات': 'All activity', 'تم تسديد قسط': 'Installment paid', 'تم تقديم طلب تقسيط': 'Installment request submitted',
  'تمت إضافة دفعة': 'Payment added', 'تم إنشاء طلب جديد': 'New request created', 'قيد المراجعة': 'Under review',
  'تمت الموافقة': 'Approved', 'قيد التوصيل': 'Out for delivery', 'تم التسليم': 'Delivered', 'استعلام': 'Inquiry',
  'طلب إطفاء فاتورة': 'Invoice closing request', 'لا توجد طلبات': 'No requests found', 'لا توجد منتجات في المفضلة': 'No favorite products yet',
  'تصفح المتجر': 'Browse store', 'الوجه الأمامي': 'Front side', 'الوجه الخلفي': 'Back side', 'التقاط حي بالكاميرا أو رفع من الهاتف': 'Take a live photo or upload from your phone',
  'ابحث عن اسم الدائرة': 'Search for department name', 'اختر تاريخ الميلاد': 'Choose date of birth', 'الشهر': 'Month',
  'السنة': 'Year', 'إطفاء': 'Close', 'بعد': 'in', 'أيام': 'days', 'السعر': 'Price', 'اللون': 'Color',
  'الشاشة': 'Display', 'المعالج': 'Processor', 'الذاكرة': 'Memory', 'الكاميرا': 'Camera', 'البطارية': 'Battery',
  'نظام التشغيل': 'Operating system', 'الدقة': 'Resolution', 'الصوت': 'Sound', 'المنافذ': 'Ports', 'النظام': 'System',
  'الموديل': 'Model', 'المحرك': 'Engine', 'الحمولة': 'Payload', 'الوقود': 'Fuel', 'ناقل الحركة': 'Transmission',
  'السعة': 'Capacity', 'الطاقة': 'Power', 'الضمان': 'Warranty', 'النوع': 'Type', 'سوناتا 2024': 'Sonata 2024',
  'كيا سبورتاج': 'Kia Sportage', 'هونداي تكسس': 'Hyundai Tucson', 'الفرع الرئيسي - بغداد': 'Main Branch — Baghdad',
  'فرع الأعظمية': 'Al-Adhamiyah Branch', 'فرع البصرة': 'Basra Branch', 'وكالة الأمل للسيارات': 'Al-Amal Motors Agency',
  'وكالة النور للإلكترونيات': 'Al-Noor Electronics Agency', 'وكالة الزهراء للأجهزة': 'Al-Zahraa Appliances Agency',
  'شارع الرشيد، وسط البلد، بغداد': 'Al-Rasheed Street, Downtown Baghdad', 'المنطقة الصناعية، بغداد': 'Industrial Area, Baghdad',
  'شارع المتنبي، بغداد': 'Al-Mutanabbi Street, Baghdad', 'الكاظمية، بغداد': 'Al-Kadhimiya, Baghdad',
  'عروض نهاية الأسبوع': 'Weekend offers', 'خصومات تصل إلى 50%': 'Discounts up to 50%', 'إلكترونيات مميزة': 'Featured electronics',
  'أحدث الأجهزة بأسعار منافسة': 'Latest devices at competitive prices', 'أثاث منزلي عصري': 'Modern home furniture',
  'تشكيلة واسعة من الأثاث': 'A wide selection of furniture', 'تيتانيوم': 'Titanium', 'أسود': 'Black', 'أبيض': 'White',
  'شاحنة JAC خفيفة': 'Light JAC truck', 'حمولة 3 طن': '3-ton payload', 'مكيف Gree سبليت': 'Gree split air conditioner',
  'غسالة Samsung أوتوماتيك': 'Samsung automatic washing machine', 'وحدة': 'unit', 'كغم': 'kg', 'فضي': 'Silver',
  'يناير': 'January', 'فبراير': 'February', 'مارس': 'March', 'أبريل': 'April', 'مايو': 'May', 'يونيو': 'June',
  'يوليو': 'July', 'أغسطس': 'August', 'سبتمبر': 'September', 'أكتوبر': 'October', 'نوفمبر': 'November', 'ديسمبر': 'December'
}

const enToAr = Object.fromEntries(Object.entries(arToEn).map(([ar, en]) => [en, ar]))

function replaceExact(value, dictionary) {
  if (!value) return value
  const leading = value.match(/^\s*/)?.[0] || ''
  const trailing = value.match(/\s*$/)?.[0] || ''
  const core = value.trim()
  if (Object.prototype.hasOwnProperty.call(dictionary, core)) return `${leading}${dictionary[core]}${trailing}`
  // Switching back to Arabic remounts the Vue route with its original copy;
  // keep this direction exact-only so short English words never alter names.
  if (language.value === 'ar') return value
  // Covers data-driven text such as dates, invoice labels, and product details
  // whose Arabic words are combined with values at render time.
  return Object.entries(dictionary)
    .sort(([a], [b]) => b.length - a.length)
    .reduce((translated, [source, target]) => translated.split(source).join(target), value)
}

function translatePage(root = document.body) {
  if (!root) return
  const dictionary = language.value === 'en' ? arToEn : enToAr
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)
  textNodes.forEach((node) => { node.nodeValue = replaceExact(node.nodeValue, dictionary) })
  root.querySelectorAll?.('[placeholder], [aria-label], [title]').forEach((element) => {
    ;['placeholder', 'aria-label', 'title'].forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, replaceExact(element.getAttribute(attribute), dictionary))
    })
  })
}

let observer
let queued = false
export function installLanguageObserver() {
  document.documentElement.lang = language.value
  document.documentElement.dir = language.value === 'en' ? 'ltr' : 'rtl'
  requestAnimationFrame(() => translatePage())
  observer?.disconnect()
  observer = new MutationObserver(() => {
    if (!queued) {
      queued = true
      requestAnimationFrame(() => { queued = false; translatePage() })
    }
  })
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
  // Some screens fill carousel and list text a moment after their component is
  // mounted. Re-checking while English is selected keeps that async copy in sync.
  window.addEventListener('hashchange', () => setTimeout(() => translatePage(), 80))
  window.setInterval(() => {
    if (language.value === 'en') translatePage()
  }, 900)
}

export function useLanguage() {
  const setLanguage = (nextLanguage) => {
    if (!['ar', 'en'].includes(nextLanguage) || language.value === nextLanguage) return
    language.value = nextLanguage
    localStorage.setItem('golden_language', nextLanguage)
    document.documentElement.lang = nextLanguage
    document.documentElement.dir = nextLanguage === 'en' ? 'ltr' : 'rtl'
    requestAnimationFrame(() => translatePage())
    window.dispatchEvent(new CustomEvent('golden-language-change'))
  }
  const t = (arabic) => language.value === 'en' ? (arToEn[arabic] || arabic) : arabic
  return { language, setLanguage, t }
}
