import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Users, MessageCircle, Search, Sparkles } from 'lucide-react';

export default function Landing() {
  const featuredUsers = mockUsers.slice(0, 4);

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Nav */}
      <nav className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-gradient">Cene-Connect</h1>
        <div className="flex gap-2">
          <Button variant="ghost" asChild><Link to="/auth">Sign In</Link></Button>
          <Button className="gradient-primary" asChild><Link to="/auth">Get Started</Link></Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <Badge className="mb-4 gradient-primary text-primary-foreground">The Entertainment Network</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">Connect with <span className="text-gradient">Entertainment</span> Professionals</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join the exclusive platform for directors, actors, producers, singers, photographers, and more. Build your network, showcase your work, and discover opportunities.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gradient-primary text-lg px-8" asChild><Link to="/auth">Join Now <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild><Link to="/search">Explore Talent</Link></Button>
        </div>

        {/* Featured */}
        <div className="mt-16 flex justify-center -space-x-4">
          {featuredUsers.map(user => (
            <Avatar key={user.id} className="h-14 w-14 ring-4 ring-background">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.displayName[0]}</AvatarFallback>
            </Avatar>
          ))}
          <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold ring-4 ring-background">+5k</div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Join 5,000+ industry professionals</p>
      </section>

      {/* Features */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: 'Connect', desc: 'Build relationships with industry professionals worldwide' },
            { icon: Search, title: 'Discover', desc: 'Find talent by role, location, and expertise' },
            { icon: MessageCircle, title: 'Collaborate', desc: 'Message directly and start working together' },
          ].map(f => (
            <div key={f.title} className="bg-card rounded-2xl p-8 shadow-card text-center">
              <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4"><f.icon className="h-7 w-7 text-primary-foreground" /></div>
              <h3 className="text-xl font-display font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <div className="bg-card rounded-3xl p-12 max-w-3xl mx-auto shadow-soft">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4">Ready to grow your career?</h2>
          <p className="text-muted-foreground mb-6">Join Cene-Connect today and connect with your next collaborator.</p>
          <Button size="lg" className="gradient-primary" asChild><Link to="/auth">Create Free Account</Link></Button>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-muted-foreground">© 2024 Cene-Connect. All rights reserved.</footer>
    </div>
  );
}
