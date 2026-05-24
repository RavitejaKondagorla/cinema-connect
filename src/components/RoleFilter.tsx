import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Video, 
  User, 
  Film, 
  Music, 
  Camera, 
  Clapperboard,
  Pen,
  Piano,
  Scissors,
  MoreHorizontal 
} from 'lucide-react';

interface RoleFilterProps {
  selectedRole?: UserRole;
  onSelectRole: (role?: UserRole) => void;
}

const roles: { role: UserRole; label: string; icon: React.ElementType }[] = [
  { role: 'director', label: 'Directors', icon: Clapperboard },
  { role: 'actor', label: 'Actors', icon: User },
  { role: 'producer', label: 'Producers', icon: Film },
  { role: 'singer', label: 'Singers', icon: Music },
  { role: 'photographer', label: 'Photographers', icon: Camera },
  { role: 'videographer', label: 'Videographers', icon: Video },
  { role: 'writer', label: 'Writers', icon: Pen },
  { role: 'composer', label: 'Composers', icon: Piano },
  { role: 'editor', label: 'Editors', icon: Scissors },
  { role: 'other', label: 'Others', icon: MoreHorizontal },
];

export function RoleFilter({ selectedRole, onSelectRole }: RoleFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant={!selectedRole ? "default" : "outline"}
        size="sm"
        className="shrink-0"
        onClick={() => onSelectRole(undefined)}
      >
        All
      </Button>
      {roles.map(({ role, label, icon: Icon }) => (
        <Button
          key={role}
          variant={selectedRole === role ? "default" : "outline"}
          size="sm"
          className={cn(
            "shrink-0 gap-2",
            selectedRole === role && "gradient-primary border-0"
          )}
          onClick={() => onSelectRole(role)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}

export default RoleFilter;
