# Testing Checklist - Support Page

## ✅ File Structure Verification

Created files:
- [x] `src/components/support/SupportHero.jsx`
- [x] `src/components/support/FAQSection.jsx`
- [x] `src/components/support/ContactForm.jsx`
- [x] `src/components/support/LiveChat.jsx`
- [x] `src/components/support/ContactInfo.jsx`
- [x] `src/services/supportService.js`
- [x] `src/pages/Support.jsx` (updated)
- [x] `src/App.jsx` (added route)
- [x] `BACKEND_SUPPORT_INTEGRATION.md`
- [x] `SUPPORT_PAGE_SUMMARY.md`

## 🧪 Browser Testing

### Navigation Test:
1. [ ] Navigate to `http://localhost:5173/support`
2. [ ] Verify page loads without errors
3. [ ] Check Header shows "Hỗ trợ" link with underline
4. [ ] Click "Hỗ trợ" in Header → Should navigate to Support page

### Hero Section Test:
1. [ ] Hero section displays with blue/cyan gradient
2. [ ] Title "Trung Tâm Hỗ Trợ" is visible
3. [ ] 3 cards are displayed:
   - [ ] Câu Hỏi Thường Gặp (with HelpOutlineIcon)
   - [ ] Chat Trực Tuyến (with SupportAgentIcon)
   - [ ] Liên Hệ (with ContactMailIcon)
4. [ ] Cards have glass morphism effect
5. [ ] Hover over cards → Should lift up (translateY)
6. [ ] Click "FAQ" card → Should scroll to FAQ section
7. [ ] Click "Chat" card → Should scroll to LiveChat section
8. [ ] Click "Contact" card → Should scroll to ContactForm section

### FAQ Section Test:
1. [ ] FAQ section displays below Hero
2. [ ] Title "Câu Hỏi Thường Gặp" is visible
3. [ ] Filter chips are displayed: Tất cả, Tài khoản, Đặt lịch, Thanh toán, Khác
4. [ ] Default filter is "Tất cả" (white border)
5. [ ] Click different category chips → FAQ list updates
6. [ ] Click "Tài khoản" → Shows only account-related FAQs
7. [ ] Accordions are collapsed by default
8. [ ] Click accordion → Expands to show answer
9. [ ] Click again → Collapses
10. [ ] ExpandMore icon rotates when expanded

### Contact Form Test:
1. [ ] Contact form displays below FAQ
2. [ ] Green gradient header is visible
3. [ ] All fields are present:
   - [ ] Họ và Tên (required)
   - [ ] Email (required)
   - [ ] Số Điện Thoại (optional)
   - [ ] Danh Mục (required dropdown)
   - [ ] Tiêu Đề (optional)
   - [ ] Nội Dung (required textarea)
4. [ ] Category dropdown has 7 options
5. [ ] Try to submit empty form → Shows error "Vui lòng điền đầy đủ..."
6. [ ] Fill all required fields → Submit button enabled
7. [ ] Click "Gửi Yêu Cầu" → Shows loading spinner
8. [ ] After 2 seconds → Success message appears
9. [ ] Form fields are cleared after success
10. [ ] Success message auto-hides after 5 seconds
11. [ ] Contact info cards display at bottom (Email, Hotline, Địa Chỉ)

### Live Chat Test:
1. [ ] Live chat section displays below Contact Form
2. [ ] Pink/yellow gradient header is visible
3. [ ] Chat container shows with bot message
4. [ ] "Đang hoạt động" status shows green dot
5. [ ] Quick question chips are visible (4 chips)
6. [ ] Click quick question chip → Message appears in input
7. [ ] Type message in input field
8. [ ] Press Enter → Message sent
9. [ ] User message appears on right side (blue background)
10. [ ] Bot response appears after 1 second on left side
11. [ ] Avatar icons display (user and agent)
12. [ ] Timestamps show for each message
13. [ ] Quick questions disappear after first message
14. [ ] Chat area scrolls with many messages

### Contact Info Test:
1. [ ] Contact info section displays at bottom
2. [ ] Purple gradient header is visible
3. [ ] 4 contact cards display:
   - [ ] Email (with icon)
   - [ ] Hotline (with icon)
   - [ ] Địa Chỉ (with icon)
   - [ ] Giờ Làm Việc (with icon)
4. [ ] Click email link → Opens email client
5. [ ] Click phone link → Opens phone dialer
6. [ ] Click address link → Opens Google Maps
7. [ ] Social media section displays
8. [ ] 4 social icons: Facebook, Twitter, Instagram, LinkedIn
9. [ ] Hover over social icon → Changes color and lifts
10. [ ] Emergency notice box displays (red border)

### Responsive Design Test:
1. [ ] Resize browser to mobile size (375px)
2. [ ] Hero cards stack vertically
3. [ ] FAQ filters wrap to multiple rows
4. [ ] Contact form fields stack vertically
5. [ ] Contact info cards stack on mobile
6. [ ] Chat interface fits mobile screen
7. [ ] All content is readable without horizontal scroll

### Performance Test:
1. [ ] Page loads in < 2 seconds
2. [ ] No console errors
3. [ ] No console warnings
4. [ ] Smooth scroll animation works
5. [ ] Form submission doesn't freeze UI
6. [ ] Chat messages render quickly

## 🐛 Common Issues to Check

### Import Errors:
- [ ] Check all imports have correct paths
- [ ] Verify Material-UI components are imported
- [ ] Check icon imports (@mui/icons-material)

### Styling Issues:
- [ ] Gradients render correctly
- [ ] Colors match design (blue/cyan, green, pink/yellow, purple)
- [ ] Spacing is consistent (mb: 8)
- [ ] Border radius is consistent (3-4)
- [ ] Hover effects work smoothly

### Functionality Issues:
- [ ] Smooth scroll works from Hero cards
- [ ] Filter chips update FAQ list
- [ ] Form validation works
- [ ] Loading states display
- [ ] Success/error messages show

### Console Checks:
- [ ] No "Failed to fetch" errors (mock data should handle this)
- [ ] No React key warnings
- [ ] No prop-type warnings
- [ ] No missing dependency warnings

## 📱 Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## 🔧 Developer Tools Check

### React DevTools:
- [ ] All components render correctly
- [ ] State updates work (FAQ filter, form data, chat messages)
- [ ] No unnecessary re-renders

### Network Tab:
- [ ] No failed API requests (should use mock data)
- [ ] No 404 errors for components
- [ ] No missing image resources

### Console Tab:
- [ ] No errors
- [ ] Expected mock data logs (if any)
- [ ] No memory leaks

## 📝 Notes

**If issues found:**
1. Document the issue with screenshot
2. Note browser and screen size
3. Check console for errors
4. Review component code
5. Verify imports and paths

**Mock Data Testing:**
- All API calls return mock data
- No backend required for testing
- Simulated delays (500ms - 2000ms)
- Success responses always returned

**Ready for Production:**
- Once all tests pass ✅
- Document any issues found
- Fix bugs before backend integration
- Review with team

---

**Testing Date:** ___________  
**Tester:** ___________  
**Status:** ⬜ Pass | ⬜ Fail | ⬜ Needs Review
