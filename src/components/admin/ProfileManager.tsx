import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  User,
  Lock,
  Mail,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  Camera,
  Calendar
} from "lucide-react";
import { useAdminProfile, updateAdminProfileFn, type AdminProfileType } from "@/lib/cms";
import { ImageInput } from "./ImageInput";
import { toast } from "sonner";

export function ProfileManager() {
  const { data: profile, isLoading } = useAdminProfile();
  const qc = useQueryClient();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setUsername(profile.username || "");
      setEmail(profile.email || "");
      setAvatarUrl(profile.avatar_url || null);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!name.trim()) {
      setFormError("Full Name cannot be empty.");
      return;
    }
    if (!username.trim()) {
      setFormError("Username cannot be empty.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please provide a valid email address.");
      return;
    }

    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        setFormError("Please enter your current password to authorize password changes.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setFormError("New Password and Confirm Password do not match.");
        return;
      }
      if (newPassword.length < 4) {
        setFormError("New password must be at least 4 characters long.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await updateAdminProfileFn({
        data: {
          currentPassword: currentPassword || undefined,
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          avatar_url: avatarUrl || "",
          newPassword: newPassword.trim() || undefined,
        }
      });

      if (res.success) {
        setFormSuccess("Profile settings & credentials updated successfully!");
        toast.success("Profile updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        qc.invalidateQueries({ queryKey: ["cms", "adminProfile"] });
      } else {
        setFormError(res.error || "Failed to update profile credentials.");
        toast.error(res.error || "Failed to update profile.");
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      setFormError(err?.message || "An error occurred while saving profile settings.");
      toast.error("Profile update failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-white/50 text-xs font-semibold gap-2">
        <Loader2 className="size-5 animate-spin text-[#D4AF37]" />
        Loading Admin Profile & Security Settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header Title */}
      <div className="border-b border-white/10 pb-5">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5 mb-1">
          <Shield className="size-3.5" /> Account Security & Customization
        </span>
        <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
          Admin Profile Settings
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Manage your administrator username, login email, profile picture, and secure access password.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Banner Feedback Messages */}
        {formSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
            {formSuccess}
          </div>
        )}

        {formError && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="size-5 shrink-0 text-red-400" />
            {formError}
          </div>
        )}

        {/* Profile Card Summary Banner */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#170B2E] via-[#0E051E] to-[#170B2E] p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Avatar Graphic */}
          <div className="relative group shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="size-24 rounded-2xl object-cover border-2 border-[#D4AF37]/40 shadow-glow"
              />
            ) : (
              <div className="size-24 rounded-2xl bg-gradient-to-br from-[#5E2B97] to-[#12002B] border-2 border-[#D4AF37]/40 grid place-items-center text-white shadow-glow">
                <User className="size-10 text-[#D4AF37]" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 size-7 rounded-xl bg-[#D4AF37] text-[#0C1220] grid place-items-center shadow-md">
              <Camera className="size-4" />
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">{name || "Admin User"}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-wider">
                {profile?.role || "Super Administrator"}
              </span>
            </div>
            <div className="text-xs text-white/60 flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1">
              <span className="flex items-center gap-1">
                <User className="size-3.5 text-[#D4AF37]" /> Username: <strong className="text-white font-mono">{username}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="size-3.5 text-[#D4AF37]" /> {email}
              </span>
            </div>
            <p className="text-[11px] text-white/40 pt-1 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="size-3" /> Credentials last synchronized with database
            </p>
          </div>
        </div>

        {/* Section 1: Personal Profile Details */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6 shadow-soft">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
              <User className="size-4 text-[#D4AF37]" /> Account Information
            </h3>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Public & Admin Identity</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Full Administrator Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Myrtle Dixon"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Login Username *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Admin Email Address (Used for Login & System Notifications) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sistersoar14@gmail.com"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageInput
                folder="admin-avatars"
                label="Profile Photo / Avatar Image"
                value={avatarUrl}
                onChange={(url) => setAvatarUrl(url)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Password & Security */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6 shadow-soft">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
              <KeyRound className="size-4 text-[#D4AF37]" /> Password & Security
            </h3>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Leave empty to keep current password</span>
          </div>

          <div className="space-y-4">
            
            {/* Current Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Current Password (Required for changes)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current admin password..."
                  className="w-full rounded-xl border border-white/15 bg-black/40 pl-4 pr-12 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {/* New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 4 characters"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-[#0C1220] shadow-glow hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="size-4" /> Save Profile Settings
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
