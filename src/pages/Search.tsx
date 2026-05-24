import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ProfileCard } from '@/components/ProfileCard';
import { RoleFilter } from '@/components/RoleFilter';
import { Input } from '@/components/ui/input';
import { useUsers } from '@/hooks/useUsers';
import { UserRole } from '@/types';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>();
  const { users } = useUsers();
  const navigate = useNavigate();

  const filtered = users.filter(u => {
    const matchQuery = !query || u.displayName.toLowerCase().includes(query.toLowerCase()) || u.username.toLowerCase().includes(query.toLowerCase());
    const matchRole = !selectedRole || u.role === selectedRole;
    return matchQuery && matchRole;
  });

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search professionals..." className="pl-12 h-12 text-lg" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <RoleFilter selectedRole={selectedRole} onSelectRole={setSelectedRole} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {filtered.map(user => (
            <ProfileCard key={user.id} user={user} onClick={() => navigate(`/profile/${user.id}`)} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
