import { useState } from 'react';
import PrimaryButton from '../shared/elements/PrimaryButton';

// Strict Interface for Disney API
interface DisneyCharacter {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  tvShows: string[];
}

interface ExplorerProps {
  returnHome: () => void;
}

export default function DisneyExplorer({ returnHome }: ExplorerProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [records, setRecords] = useState<DisneyCharacter[]>([]);
  const [activeCharId, setActiveCharId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Requirement: API Fetch
  const executeSearch = async () => {
    if (!keyword) return;
    setIsFetching(true);
    try {
      const response = await fetch(`https://api.disneyapi.dev/character?name=${keyword}`);
      const payload = await response.json();
      
      if (payload.data) {
        const normalizedData = Array.isArray(payload.data) ? payload.data : [payload.data];
        setRecords(normalizedData.slice(0, 4));
      } else {
        setRecords([]); 
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Requirement: Array Reduce (Count characters that have TV Shows)
  const charactersWithTvShows = records.reduce((total, char) => {
    return char.tvShows && char.tvShows.length > 0 ? total + 1 : total;
  }, 0);

  // Requirement: Array Find (Locate active character)
  const currentCharacter = records.find(char => char._id === activeCharId);

  // DETAIL SCREEN
  if (currentCharacter) {
    return (
      <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">{currentCharacter.name}</h2>
        <img 
          src={currentCharacter.imageUrl} 
          alt={currentCharacter.name} 
          className="w-64 h-64 object-cover mx-auto rounded-xl shadow-md mb-6" 
        />
        <div className="text-left bg-slate-50 p-5 rounded-lg mb-8 border border-slate-200">
          <p className="mb-2"><strong>Films:</strong> {currentCharacter.films?.length > 0 ? currentCharacter.films.slice(0, 3).join(", ") : "Not available"}</p>
          <p><strong>TV Shows:</strong> {currentCharacter.tvShows?.length > 0 ? currentCharacter.tvShows.slice(0, 3).join(", ") : "Not available"}</p>
        </div>
        <PrimaryButton onTrigger={() => setActiveCharId(null)} customClass="w-full">
          Back to List
        </PrimaryButton>
      </div>
    );
  }

  // MAIN SEARCH SCREEN
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-slate-800">Disney Magic Explorer</h2>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <input 
          type="text" 
          placeholder="E.g. Mickey, Mulan..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full sm:w-96 p-4 border-2 border-slate-200 rounded-lg shadow-sm focus:border-indigo-500 outline-none"
        />
        <PrimaryButton onTrigger={executeSearch}>Discover</PrimaryButton>
      </div>

      
      <>
        {isFetching && <p className="text-center text-slate-500 mb-6 font-medium">Fetching magic...</p>}
        {records.length > 0 && (
          <p className="text-center font-bold text-indigo-600 mb-8">
            Characters with TV Shows in this list: {charactersWithTvShows}
          </p>
        )}
      </>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {records.map((char) => (
          <div key={char._id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center">
            <img 
              src={char.imageUrl} 
              alt={char.name} 
              className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm" 
            />
            <div className="flex flex-col flex-1 w-full">
              <h3 className="font-bold text-lg mb-2 text-slate-800">{char.name}</h3>
              <p className="text-xs text-slate-500 mb-5 line-clamp-2">
                {char.films?.length > 0 ? char.films[0] : "Disney Universe"}
              </p>
              <PrimaryButton onTrigger={() => setActiveCharId(char._id)} customClass="mt-auto w-full text-xs">
                View Profile
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 border-t border-slate-200 pt-8">
        <PrimaryButton onTrigger={returnHome} customClass="bg-slate-500 hover:bg-slate-600">
          Return to Dashboard
        </PrimaryButton>
      </div>
    </div>
  );
}