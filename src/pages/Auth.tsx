import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { login, register } from "@/services/authService";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const data = await login(email.trim(), password);

        if (!data.token) {
          throw new Error("Token not received");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/feed");
      } else {
        // REGISTER
        await register(name.trim(), email.trim(), password, role);
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error("AUTH ERROR:", error);
      alert(
        error?.message ||
        error?.response?.data?.message ||
        "Authentication failed"
      );
    }
  };

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="bg-card rounded-2xl shadow-card p-8">
          <h1 className="text-3xl font-display font-bold text-center mb-2">
            {isLogin ? "Welcome Back" : "Join Cine-Connect"}
          </h1>

          <Tabs
            value={authMethod}
            onValueChange={(v) => setAuthMethod(v as "email" | "phone")}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="h-4 w-4 mr-2" /> Email
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Phone className="h-4 w-4 mr-2" /> Phone
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <TabsContent value="email" className="space-y-4 mt-0">
                {!isLogin && (
                  <>
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />

                    <Label>Role</Label>
                    <Select onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Actor", "Director", "Producer", "Writer"].map(
                          (r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </>
                )}

                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </TabsContent>

              <Button type="submit" className="w-full gradient-primary">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
