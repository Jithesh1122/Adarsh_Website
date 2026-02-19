import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FIXED_ADMIN_EMAIL } from "@/constants/auth";

const AdminLogin = () => {
  const { login, isAdmin, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSending, setIsResetSending] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, isAuthLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isSuccess = await login(email, password);
    setIsSubmitting(false);

    if (isSuccess) {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      setEmail("");
      setPassword("");
      navigate("/admin", { replace: true });
      return;
    }

    toast({
      title: "Login Failed",
      description: "Invalid email/password or not an admin account.",
      variant: "destructive",
    });
  };

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast({
        title: "Email Required",
        description: "Enter your admin email first, then click Forgot Password.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedEmail.toLowerCase() !== FIXED_ADMIN_EMAIL.toLowerCase()) {
      toast({
        title: "Not Allowed",
        description: "Password reset is only allowed for the fixed admin email.",
        variant: "destructive",
      });
      return;
    }

    setIsResetSending(true);
    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      toast({
        title: "Reset Link Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch {
      toast({
        title: "Reset Failed",
        description: "Could not send reset email. Verify the email and try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetSending(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Admin Login
            </CardTitle>
            <CardDescription className="text-slate-600">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2 border-2 border-slate-200 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 border-2 border-slate-200 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleForgotPassword}
                  disabled={isResetSending}
                  className="px-0 text-blue-600 hover:text-blue-700"
                >
                  {isResetSending ? "Sending reset link..." : "Forgot Password?"}
                </Button>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
