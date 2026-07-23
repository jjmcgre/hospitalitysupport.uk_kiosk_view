import { useEffect, useState, useRef } from 'react';
import {
  FolderOpen, FolderPlus, Upload, Download, Trash2, Lock, File,
  FileText, Image, Film, Archive, RefreshCw, ChevronRight, X, Plus,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';

interface Folder {
  id: string;
  name: string;
  parent_id: string | null;
  is_admin_only: boolean;
  created_by_user_id: string | null;
}

interface Doc {
  id: string;
  folder_id: string | null;
  display_name: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by_name: string;
  created_at: string;
}

function fileIcon(mime: string) {
  if (mime.startsWith('image/')) return <Image size={16} className="text-sky-400" />;
  if (mime.startsWith('video/')) return <Film size={16} className="text-purple-400" />;
  if (mime === 'application/pdf') return <FileText size={16} className="text-red-400" />;
  if (mime.includes('zip') || mime.includes('tar') || mime.includes('rar')) return <Archive size={16} className="text-yellow-400" />;
  if (mime.includes('word') || mime.includes('document')) return <FileText size={16} className="text-blue-400" />;
  return <File size={16} className="text-slate-400" />;
}

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DocsPage() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const [folders, setFolders] = useState<Folder[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderAdmin, setNewFolderAdmin] = useState(false);
  const [savingFolder, setSavingFolder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const [fRes, dRes] = await Promise.all([
      supabase.from('document_folders').select('*').order('name'),
      supabase.from('documents').select('*').order('created_at', { ascending: false }),
    ]);
    setFolders((fRes.data ?? []) as Folder[]);
    setDocs((dRes.data ?? []) as Doc[]);
    setLoading(false);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel('docs-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'document_folders' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'documents' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const activeDocs = docs.filter(d => d.folder_id === activeFolderId);
  const activeFolder = folders.find(f => f.id === activeFolderId);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0 || !user) return;
    setUploading(true);
    setUploadError('');
    const displayName = profile?.display_name || user.email?.split('@')[0] || 'Unknown';

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop() ?? '';
      const path = `${user.id}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('documents').upload(path, file);
      if (upErr) { setUploadError(upErr.message); setUploading(false); return; }
      const { error: dbErr } = await supabase.from('documents').insert({
        folder_id: activeFolderId,
        display_name: file.name,
        storage_path: path,
        file_size: file.size,
        mime_type: file.type || 'application/octet-stream',
        uploaded_by_user_id: user.id,
        uploaded_by_name: displayName,
      });
      if (dbErr) { setUploadError(dbErr.message); setUploading(false); return; }
    }
    await load();
    setUploading(false);
  }

  async function handleDownload(doc: Doc) {
    const { data, error } = await supabase.storage.from('documents').createSignedUrl(doc.storage_path, 3600);
    if (error || !data?.signedUrl) return;
    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.download = doc.display_name;
    a.target = '_blank';
    a.click();
  }

  async function handleDeleteDoc(doc: Doc) {
    if (!confirm(`Delete "${doc.display_name}"?`)) return;
    await supabase.storage.from('documents').remove([doc.storage_path]);
    await supabase.from('documents').delete().eq('id', doc.id);
    setDocs(prev => prev.filter(d => d.id !== doc.id));
  }

  async function createFolder() {
    if (!newFolderName.trim() || !user) return;
    setSavingFolder(true);
    await supabase.from('document_folders').insert({
      name: newFolderName.trim(),
      parent_id: null,
      is_admin_only: newFolderAdmin,
      created_by_user_id: user.id,
    });
    setNewFolderName('');
    setNewFolderAdmin(false);
    setShowNewFolder(false);
    setSavingFolder(false);
    await load();
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div className="min-h-full">
      <PageHeader title="Documents" subtitle="Upload, organise and share files with the team." />

      <div className="flex h-[calc(100vh-130px)]">
        {/* Folder sidebar */}
        <div className="w-56 flex-shrink-0 border-r border-slate-800 bg-slate-900/50 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Folders</span>
            {isAdmin && (
              <button
                onClick={() => setShowNewFolder(true)}
                className="p-1 rounded-md text-slate-600 hover:text-teal-400 hover:bg-slate-800 transition-colors"
                title="New folder"
              >
                <FolderPlus size={13} />
              </button>
            )}
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
            <button
              onClick={() => setActiveFolderId(null)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFolderId === null ? 'bg-teal-500/15 text-teal-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FolderOpen size={14} className="flex-shrink-0" />
              <span className="truncate">All Files</span>
            </button>
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFolderId === folder.id ? 'bg-teal-500/15 text-teal-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FolderOpen size={14} className="flex-shrink-0 opacity-70" />
                <span className="truncate flex-1 text-left">{folder.name}</span>
                {folder.is_admin_only && <Lock size={10} className="flex-shrink-0 text-slate-600" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/30">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Documents</span>
              {activeFolder && (
                <>
                  <ChevronRight size={12} />
                  <span className="text-white font-medium">{activeFolder.name}</span>
                  {activeFolder.is_admin_only && <Lock size={11} className="text-slate-500" />}
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={load} className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-slate-800 transition-colors">
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                {uploading ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                {uploading ? 'Uploading…' : 'Upload'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={e => handleUpload(e.target.files)}
              />
            </div>
          </div>

          {uploadError && (
            <div className="mx-6 mt-3 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-red-400 text-sm">
              <AlertCircle size={14} />
              {uploadError}
              <button onClick={() => setUploadError('')} className="ml-auto"><X size={13} /></button>
            </div>
          )}

          {/* Drop zone + file list */}
          <div
            className="flex-1 overflow-y-auto p-6"
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
          >
            {loading ? (
              <div className="flex items-center justify-center h-32 text-slate-600 text-sm">
                <RefreshCw size={16} className="animate-spin mr-2" />Loading…
              </div>
            ) : activeDocs.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-800 rounded-xl text-slate-600 cursor-pointer hover:border-slate-700 hover:text-slate-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={24} className="mb-3 opacity-40" />
                <p className="text-sm font-medium">Drop files here or click to upload</p>
                <p className="text-xs mt-1 opacity-60">Max 50 MB per file</p>
              </div>
            ) : (
              <div className="space-y-1">
                {activeDocs.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      {fileIcon(doc.mime_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{doc.display_name}</p>
                      <p className="text-slate-600 text-[10px] mt-0.5">
                        {fmtSize(doc.file_size)} · {doc.uploaded_by_name} · {fmtDate(doc.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-slate-800 transition-colors"
                        title="Download"
                      >
                        <Download size={13} />
                      </button>
                      {(isAdmin || doc.uploaded_by_name === (profile?.display_name || user?.email?.split('@')[0])) && (
                        <button
                          onClick={() => handleDeleteDoc(doc)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New folder modal */}
      {showNewFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-base">New folder</h2>
              <button onClick={() => setShowNewFolder(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                autoFocus
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') createFolder(); }}
                placeholder="Folder name"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newFolderAdmin}
                  onChange={e => setNewFolderAdmin(e.target.checked)}
                  className="rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-400 flex items-center gap-1.5">
                  <Lock size={12} />Admin only
                </span>
              </label>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={createFolder}
                disabled={!newFolderName.trim() || savingFolder}
                className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                <Plus size={14} />Create
              </button>
              <button onClick={() => setShowNewFolder(false)} className="px-4 text-slate-500 hover:text-slate-300 text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
