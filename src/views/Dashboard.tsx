import PrimaryButton from '../shared/elements/PrimaryButton';

interface DashboardProps {
  navigate: (screen: string) => void;
}

export default function Dashboard({ navigate }: DashboardProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <h1 className="text-5xl font-black text-slate-900 mb-12 tracking-tighter">My Workspace</h1>
      
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <PrimaryButton onTrigger={() => navigate('math')} customClass="text-lg py-4">
          1. Basic Addition
        </PrimaryButton>
        <PrimaryButton onTrigger={() => navigate('calc')} customClass="text-lg py-4">
          2. Smart Calculator
        </PrimaryButton>
        <PrimaryButton onTrigger={() => navigate('disney')} customClass="text-lg py-4">
          3. Disney API Explorer
        </PrimaryButton>
      </div>
    </div>
  );
}