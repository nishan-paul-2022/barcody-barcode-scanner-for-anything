# Phase 11: Export Functionality - AI Implementation Prompts

> **3 Tasks**: CSV & JSON export, PDF & Excel export, Frontend export UI
>
> **No Code Snippets** - Requirements-driven approach for intelligent implementation

---

## Task 11.1: Backend Export - CSV & JSON

**TASK**: Implement CSV and JSON export with streaming for large datasets to prevent memory issues.

**SYSTEM CONTEXT**: Users need to export scan data for external analysis, reporting, or backup. Streaming is critical for handling large datasets (10k+ scans) without loading everything into memory. Must support filters for targeted exports.

**REQUIREMENTS**:

1. **Dependencies**: Install json2csv package for CSV generation
2. **Export Module**: Create ExportModule in backend
3. **CSV Endpoint**: Implement GET /export/csv:
   - Accept query parameters: startDate, endDate, barcodeType, deviceType
   - Apply filters to database query
   - Use Node.js Transform streams for streaming
   - Process records in chunks of 1000
   - Set headers: Content-Type: text/csv, Content-Disposition: attachment
   - Stream CSV rows directly to response
4. **JSON Endpoint**: Implement GET /export/json:
   - Same filter parameters as CSV
   - Stream JSON array using streaming JSON library
   - Process in chunks of 1000 records
   - Set headers: Content-Type: application/json, Content-Disposition: attachment
5. **Streaming Implementation**: Use Transform streams:
   - Create readable stream from database query
   - Transform each chunk to CSV/JSON format
   - Pipe to response stream
   - Handle backpressure correctly
6. **Memory Management**: Ensure constant memory usage regardless of dataset size
7. **Error Handling**: Handle stream errors, database errors, invalid filters
8. **Authentication**: Protect endpoints with JWT auth guard

**CONSTRAINTS**:
- Must handle 100k+ records without memory issues
- Memory usage must stay constant during export
- Fast streaming (start within 1 second)
- Proper CSV escaping for special characters
- Valid JSON array format

**INTEGRATION POINTS**:
- Scans database from Task 3.1
- Filter logic similar to scan API (Task 5.2)
- Frontend export UI will call these endpoints (Task 11.3)

**TESTING REQUIREMENTS**:
1. Small datasets (<100 records) export correctly
2. Large datasets (>10,000 records) stream successfully
3. Memory usage stays constant during large exports
4. Filters apply correctly
5. CSV format valid (no broken rows)
6. JSON format valid (proper array)
7. Special characters escaped in CSV
8. Authentication required

**ACCEPTANCE CRITERIA**:
- ✅ CSV export endpoint functional
- ✅ JSON export endpoint functional
- ✅ Streaming handles large datasets
- ✅ Memory usage constant
- ✅ Filters working
- ✅ Proper file headers
- ✅ Error handling robust

**QUALITY STANDARDS**:
- Follow Node.js streaming best practices
- Efficient database queries
- Proper stream error handling
- Clean, maintainable code
- Comprehensive logging

**DELIVERABLES**:
- ExportModule implementation
- CSV export endpoint with streaming
- JSON export endpoint with streaming
- Filter implementation
- Error handling logic
- Authentication guards

**SUCCESS METRIC**: Export 100k scans with constant memory usage and fast streaming.

---

## Task 11.2: Backend Export - PDF & Excel

**TASK**: Implement PDF and Excel export with professional formatting, charts, and branding.

**SYSTEM CONTEXT**: Professional exports for reports, presentations, and stakeholder sharing. PDF for read-only reports, Excel for further analysis. Must include summary statistics and visualizations.

**REQUIREMENTS**:

1. **Dependencies**: Install pdfkit for PDF generation, exceljs for Excel files
2. **PDF Endpoint**: Implement GET /export/pdf:
   - Accept same filter parameters as CSV
   - Create PDF document with pdfkit
   - Add header with logo and title
   - Create formatted table with scan data
   - Add summary statistics section
   - Include charts (scans over time, barcode type distribution)
   - Add footer with page numbers and timestamp
   - Apply branding colors (neon blue theme)
   - Stream PDF to response
3. **Excel Endpoint**: Implement GET /export/excel:
   - Accept same filter parameters
   - Create workbook with exceljs
   - Create multiple sheets:
     - "Scans" sheet with all scan data
     - "Statistics" sheet with summary metrics
     - "Charts" sheet with embedded charts
   - Format headers (bold, colored background)
   - Auto-size columns
   - Add filters to data sheet
   - Include formulas for statistics
   - Apply conditional formatting
   - Stream Excel file to response
4. **Branding**: Add company logo, use brand colors, professional styling
5. **Charts**: Generate charts using chart libraries:
   - Line chart for scans over time
   - Pie chart for barcode type distribution
   - Bar chart for device breakdown
6. **Error Handling**: Handle generation errors, invalid data, missing charts

**CONSTRAINTS**:
- PDF must be readable and professional
- Excel must have proper formatting
- File sizes reasonable (<10MB for 10k records)
- Generation fast (<5 seconds for 1k records)
- Charts must be accurate

**INTEGRATION POINTS**:
- Scans database from Task 3.1
- Analytics aggregation for charts
- Frontend export UI (Task 11.3)

**TESTING REQUIREMENTS**:
1. PDF generates correctly
2. Excel generates with multiple sheets
3. Charts render in both formats
4. Branding applied correctly
5. Filters work
6. File sizes reasonable
7. Generation time acceptable
8. Files open correctly in viewers

**ACCEPTANCE CRITERIA**:
- ✅ PDF export endpoint functional
- ✅ Excel export endpoint functional
- ✅ Multiple sheets in Excel
- ✅ Charts included
- ✅ Professional formatting
- ✅ Branding applied
- ✅ Filters working

**QUALITY STANDARDS**:
- Professional document design
- Accurate charts
- Proper formatting
- Clear data presentation
- Brand consistency

**DELIVERABLES**:
- PDF export endpoint
- Excel export endpoint
- Chart generation logic
- Branding templates
- Multi-sheet Excel implementation

**SUCCESS METRIC**: Professional PDF and Excel exports with charts and branding.

---

## Task 11.3: Frontend Export UI

**TASK**: Create export interface for web and mobile with format selection, filters, and progress indicators.

**SYSTEM CONTEXT**: User-friendly export interface allowing users to choose format, apply filters, and download/share exported data. Must handle large exports gracefully with progress indication.

**REQUIREMENTS**:

**WEB IMPLEMENTATION**:

1. **Export Modal**: Create modal component for export
2. **Format Selection**: Radio buttons or dropdown for format:
   - CSV (for spreadsheets)
   - JSON (for developers)
   - PDF (for reports)
   - Excel (for analysis)
3. **Date Range Picker**: Implement date range selector:
   - Predefined ranges (Last 7 days, Last 30 days, All time)
   - Custom date range picker
   - Validation (start date < end date)
4. **Filter Options**: Add filter checkboxes:
   - Barcode type filter (QR, EAN, UPC, etc.)
   - Device type filter (web, mobile)
5. **Export Button**: Trigger export with selected options
6. **Progress Indicator**: Show progress during export:
   - Loading spinner
   - Progress percentage (if available)
   - Cancel button
7. **Download Handling**: Trigger browser download when complete
8. **Error Handling**: Display errors with retry option
9. **Large Export Warning**: Warn user if exporting >10k records

**MOBILE IMPLEMENTATION**:

1. **Dependencies**: Install expo-file-system for file operations, expo-sharing for sharing
2. **Export Screen**: Create dedicated export screen
3. **Format Selection**: Same as web (CSV, JSON, PDF, Excel)
4. **Filters**: Same filter options as web
5. **Export Button**: Trigger export with loading state
6. **Progress Indicator**: Show progress with percentage
7. **File Download**: Save file to device storage using expo-file-system
8. **Share Functionality**: Use expo-sharing to share exported file:
   - Share via email, messaging apps
   - Save to cloud storage
9. **Storage Permissions**: Request storage permissions on Android
10. **Error Handling**: Display errors with retry option

**CONSTRAINTS**:
- Intuitive UI/UX
- Clear progress indication
- Handle large exports (show warning)
- Proper error messages
- Responsive design (web)
- Platform-appropriate UI (mobile)

**INTEGRATION POINTS**:
- Export endpoints from Tasks 11.1 and 11.2
- Scan filters from scan API
- File system APIs (mobile)

**TESTING REQUIREMENTS**:
1. Export modal/screen displays correctly
2. All format options work
3. Filters apply correctly
4. Date range validation works
5. Progress indicator shows
6. Files download/save successfully
7. Sharing works (mobile)
8. Error handling displays messages
9. Large export warning shows
10. Responsive on all screen sizes (web)

**ACCEPTANCE CRITERIA**:
- ✅ Web export modal functional
- ✅ Mobile export screen functional
- ✅ All 4 formats export
- ✅ Filters apply correctly
- ✅ Progress indication working
- ✅ Download/save successful
- ✅ Sharing functional (mobile)
- ✅ Error handling robust

**QUALITY STANDARDS**:
- User-friendly interface
- Clear visual feedback
- Smooth UX flow
- Accessible components
- Platform-appropriate design

**DELIVERABLES**:
- Web export modal component
- Mobile export screen
- Format selection UI
- Filter components
- Progress indicators
- Download/share logic
- Error handling UI

**SUCCESS METRIC**: Users can easily export scans in any format with filters on both platforms.

---

**END OF PHASE 11**
