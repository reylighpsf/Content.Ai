# Fix Image Sending to Search Page and API

## Tasks
- [ ] Modify Promptbox.tsx to store mimeType with base64 in sessionStorage
- [ ] Modify SearchPageClient.tsx to retrieve and send mimeType to API
- [ ] Modify API route to use dynamic mimeType instead of hardcoded "image/jpeg"
- [ ] Test with different image formats (PNG, JPG, etc.)
