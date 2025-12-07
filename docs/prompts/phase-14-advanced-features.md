# Phase 14: Advanced Features - AI Implementation Prompts

> **2 Tasks**: Product comparison, advanced search & filters
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 14.1: Product Comparison

**TASK**: Implement side-by-side product comparison feature for informed purchasing decisions.

**SYSTEM CONTEXT**: Help users compare multiple products to make informed choices about nutrition, allergens, and ingredients. Critical for health-conscious users who need to evaluate options before purchasing.

**REQUIREMENTS**:

**BACKEND IMPLEMENTATION**:

1. **Comparison Endpoint**: Create POST /products/compare
2. **Request Handling**: Accept array of barcodes (minimum 2, maximum 5)
3. **Product Fetching**: Fetch product data for each barcode from cache or external APIs
4. **Data Normalization**: Normalize all products to common structure:
   - Product name, brand, barcode
   - Nutrition facts (calories, protein, carbs, fat, sodium, sugar, fiber)
   - Allergens list
   - Ingredients list
   - Nutrition grade (A-E)
   - Category
5. **Comparison Logic**: Calculate differences:
   - Identify better/worse nutrition values
   - Flag common allergens
   - Highlight unique ingredients
   - Compare nutrition grades
6. **Response Structure**: Return comparison data with highlights and differences
7. **Error Handling**: Handle missing products, invalid barcodes, API failures

**WEB IMPLEMENTATION**:

1. **Comparison Page**: Create /compare route
2. **Product Selection UI**: Add product selection from scan history:
   - Checkbox selection in scan history
   - "Compare Selected" button
   - Maximum 5 products
   - Minimum 2 products required
3. **Side-by-Side Layout**: Display products in grid:
   - Responsive grid (2 columns on mobile, 3-5 on desktop)
   - Product images at top
   - Nutrition facts below
   - Allergens section
   - Ingredients section
4. **Nutrition Comparison Charts**: Add visual comparisons:
   - Bar charts for macronutrients
   - Color coding (green=better, red=worse)
   - Percentage differences
5. **Difference Highlighting**: Highlight key differences:
   - Bold better values in green
   - Bold worse values in red
   - Show percentage difference
6. **Allergen Matrix**: Create allergen comparison table:
   - Rows: allergen types
   - Columns: products
   - Color coding (red=present, green=absent)
7. **Print/Export**: Add print-friendly view and PDF export
8. **Responsive Design**: Mobile-friendly comparison view

**MOBILE IMPLEMENTATION**:

1. **Comparison Screen**: Create comparison screen
2. **Product Selection**: Add selection from scan history:
   - Long-press to select
   - Multi-select mode
   - "Compare" button when 2-5 selected
3. **Swipe View**: Horizontal swipe between products:
   - One product per screen
   - Swipe left/right to navigate
   - Dots indicator for position
4. **Comparison Table View**: Add table view option:
   - Scrollable table
   - Products as columns
   - Nutrition facts as rows
5. **Difference Highlighting**: Color code differences
6. **Share Feature**: Add share comparison:
   - Generate comparison image
   - Share via messaging apps
   - Save to photos

**CONSTRAINTS**:
- Handle 2-5 products only
- Clear visual differences required
- Responsive design mandatory
- Fast comparison generation (<2s)
- Handle missing data gracefully

**INTEGRATION POINTS**:
- Product lookup from Task 10.3
- Scan history from Tasks 6.3, 7.3
- Product cache from Task 10.2

**TESTING REQUIREMENTS**:
1. Comparison works with 2 products
2. Comparison works with 5 products
3. Differences highlighted correctly
4. Charts render accurately
5. Responsive on all screen sizes
6. Print view works (web)
7. Share works (mobile)
8. Handles missing product data
9. Works on both platforms

**ACCEPTANCE CRITERIA**:
- ✅ Backend endpoint functional
- ✅ Web comparison page created
- ✅ Mobile comparison screen created
- ✅ Side-by-side layout working
- ✅ Charts render correctly
- ✅ Differences highlighted
- ✅ Allergen matrix displays
- ✅ Print/export works (web)
- ✅ Share works (mobile)
- ✅ Responsive design

**QUALITY STANDARDS**:
- Clean, intuitive UI
- Accurate comparisons
- Clear visual hierarchy
- Accessible components
- Smooth UX
- Professional design

**DELIVERABLES**:
- Comparison endpoint
- Web comparison page
- Mobile comparison screen
- Comparison logic
- Visual highlighting
- Charts and tables
- Print/share functionality

**SUCCESS METRIC**: Users can compare 2-5 products side-by-side with clear visual differences and nutrition insights.

---

## Task 14.2: Advanced Search & Filters

**TASK**: Implement advanced search with full-text search, multiple filters, and intelligent suggestions.

**SYSTEM CONTEXT**: Enable users to find scans quickly with powerful search capabilities. Critical for users with large scan histories who need to locate specific items efficiently.

**REQUIREMENTS**:

**BACKEND IMPLEMENTATION**:

1. **Full-Text Search**: Implement PostgreSQL full-text search:
   - Create tsvector column for search
   - Index: CREATE INDEX idx_scans_search ON scans USING GIN(to_tsvector('english', barcode_data || ' ' || COALESCE(product_name, '')))
   - Support partial matching
   - Rank results by relevance
2. **Search Endpoint**: Enhance GET /scans endpoint:
   - Add query parameter: ?search=text
   - Add filter parameters: dateFrom, dateTo, barcodeType, category, nutritionGrade, deviceType
   - Add sort parameter: sortBy, sortOrder
   - Return results with relevance score
3. **Filter Implementation**: Implement all filters:
   - Date range filter (startDate, endDate)
   - Barcode type filter (QR, EAN-13, UPC-A, etc.)
   - Product category filter (food, beverage, etc.)
   - Nutrition grade filter (A, B, C, D, E)
   - Device type filter (web, mobile-ios, mobile-android)
4. **Sorting Options**: Add sorting:
   - Date (newest first, oldest first)
   - Barcode type (alphabetical)
   - Product name (alphabetical)
   - Nutrition grade (best first, worst first)
5. **Search Suggestions**: Implement autocomplete:
   - Track popular searches
   - Return top 10 suggestions
   - Match on prefix
   - Include recent user searches
6. **Batch Delete Endpoint**: Create DELETE /scans/batch:
   - Accept array of scan IDs
   - Delete multiple scans
   - Return count of deleted scans
7. **Query Optimization**: Ensure fast queries:
   - Use proper indexes
   - Optimize JOIN queries
   - Cache frequent searches

**WEB IMPLEMENTATION**:

1. **Advanced Search UI**: Create search component:
   - Search input with autocomplete
   - Filter panel (collapsible)
   - Active filters display
   - Clear all filters button
2. **Search Input**: Implement search box:
   - Debounced search (300ms)
   - Autocomplete dropdown
   - Recent searches
   - Clear button
3. **Filter Chips**: Display active filters as removable chips:
   - Show filter name and value
   - X button to remove
   - Count of active filters
4. **Filter Dropdowns**: Add filter controls:
   - Date range picker
   - Barcode type multi-select
   - Category multi-select
   - Nutrition grade multi-select
   - Device type multi-select
5. **URL Persistence**: Persist filters in URL:
   - Update query params on filter change
   - Restore filters from URL on page load
   - Enable shareable filtered views
6. **Batch Selection**: Implement batch operations:
   - Checkbox for each scan
   - Select all checkbox
   - Batch delete button
   - Confirmation dialog
7. **Results Display**: Show search results:
   - Results count
   - Relevance highlighting
   - Loading states
   - Empty state

**MOBILE IMPLEMENTATION**:

1. **Search Screen**: Create dedicated search screen
2. **Search Input**: Add search with suggestions:
   - Auto-focus on screen open
   - Show suggestions below input
   - Recent searches section
3. **Filter Bottom Sheet**: Implement filter UI:
   - Slide-up bottom sheet
   - All filter options
   - Apply/Reset buttons
   - Active filter count badge
4. **Filter Chips**: Show active filters as chips:
   - Horizontal scroll
   - Tap to remove
5. **Batch Selection Mode**: Add batch operations:
   - Long-press to enter selection mode
   - Multi-select checkboxes
   - Batch delete action
   - Select all option
6. **Swipe to Delete**: Add swipe gesture for single delete

**CONSTRAINTS**:
- Search must be fast (<100ms)
- Efficient database indexes required
- Intuitive UI mandatory
- Mobile-friendly filters
- Handle large result sets

**INTEGRATION POINTS**:
- Scans database from Task 3.1
- Product data from Task 10.4
- Scan history UI from Tasks 6.3, 7.3

**TESTING REQUIREMENTS**:
1. Full-text search works correctly
2. All filters apply properly
3. Sorting works for all options
4. Suggestions display correctly
5. Fast search results (<100ms)
6. Batch delete works
7. URL persistence works (web)
8. Filter bottom sheet works (mobile)
9. Responsive on all screen sizes
10. Works on both platforms

**ACCEPTANCE CRITERIA**:
- ✅ Full-text search implemented
- ✅ All filters functional
- ✅ Sorting works
- ✅ Fast results (<100ms)
- ✅ Suggestions working
- ✅ Batch delete functional
- ✅ Web UI intuitive
- ✅ Mobile UI intuitive
- ✅ URL persistence (web)
- ✅ Responsive design

**QUALITY STANDARDS**:
- Fast, efficient search
- Intuitive filter UI
- Clear visual feedback
- Accessible components
- Smooth UX
- Professional design

**DELIVERABLES**:
- Full-text search implementation
- Search endpoint with filters
- Filter implementation
- Suggestions logic
- Batch delete endpoint
- Web search UI
- Mobile search screen
- Filter components
- URL persistence

**SUCCESS METRIC**: Users can find scans quickly with powerful search, multiple filters, and intelligent suggestions.

---

**END OF PHASE 14**
