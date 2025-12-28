import { Suspense } from "react";
import SearchPageClient from "./components/SearchPageClient"

export default function Page() {
  return (
    <Suspense fallback={<div className="loading-indicator">Memuat...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
