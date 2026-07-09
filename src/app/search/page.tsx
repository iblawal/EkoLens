import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/search/SearchBar";
import TransportModes from "@/components/search/TransportModes";
import RecentSearches from "@/components/search/RecentSearches";

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>
            Where are you going?
          </h1>
          <p className="text-sm mb-8" style={{ color: "#64748B" }}>
            Find the fastest and cheapest way across Lagos.
          </p>
          <SearchBar />
          <TransportModes />
          <RecentSearches />
        </div>
      </main>
    </>
  );
}