import { useState } from 'react';
import { Users, BarChart2, BookOpen } from 'lucide-react';
import PageHeader from './components/PageHeader';
import ContactsTab from './email/ContactsTab';
import CampaignsTab from './email/CampaignsTab';
import AnalyticsTab from './email/AnalyticsTab';

type Tab = 'contacts' | 'campaigns' | 'analytics';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'campaigns', label: 'Campaign copy', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');

  return (
    <div className="min-h-full">
      <PageHeader
        title="Email Campaigns"
        subtitle="Manage contacts, send personalised emails, and track opens, clicks, and engagement."
        deployLabel="Send emails from the Contacts tab — select a contact and choose which email in the sequence to send."
        badge="Email"
      />
      <div className="px-4 py-6 sm:p-8 space-y-6">
        {/* Tab bar */}
        <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-2xl p-1.5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? 'bg-slate-700 text-white shadow-sm border border-slate-600'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'campaigns' && <CampaignsTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>
    </div>
  );
}
