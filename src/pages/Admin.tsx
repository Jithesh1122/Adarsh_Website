import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Image, Megaphone, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { db } from "@/lib/firebase";
import { FIXED_ADMIN_EMAIL } from "@/constants/auth";

const DEFAULT_ADMISSION_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGpIoBHOVxUsNOyKLGh6vQuY9_9hQuU890fkz3PzA5ls1LHw/viewform?usp=dialog";
const DEFAULT_COLLEGE_UPDATES = [
  "Admissions open for 2026 batch. Apply early to secure your seat.",
  "New short-term computer skill programs now available.",
  "Visit the campus office Monday to Saturday for counseling support.",
];

const Admin = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [aboutUsText, setAboutUsText] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactHours, setContactHours] = useState("");
  const [admissionFormLink, setAdmissionFormLink] = useState("");
  const [collegeUpdates, setCollegeUpdates] = useState<string[]>(
    DEFAULT_COLLEGE_UPDATES
  );
  const [newUpdateText, setNewUpdateText] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [stats, setStats] = useState({
    coursesCount: 0,
    galleryCount: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchAboutUs = async () => {
      const aboutDoc = await getDoc(doc(db, "siteContent", "about"));
      if (aboutDoc.exists()) {
        setAboutUsText(aboutDoc.data().text || "");
      } else {
        setAboutUsText(
          "Adarsh Technical Institute - Uppala and Ideasi Technical Institute - Kasaragod are two well-established and reputed educational institutions located in Kasaragod District. These institutions operate under the control of the Director of Technical Education, Government of Kerala. For over 25 years, our institutions have been providing high-quality technical and computer training to students across the region. We are proud to have received overwhelming support and positive response from the community since our inception. Our institutions have played a vital role in the educational and social development of the region by empowering students with practical skills and job-ready knowledge in technical and computer fields. To date, more than 1,00,000 students have successfully completed various courses from our institutions. In today's technology-driven world, computer and technical education is indispensable, and we are committed to offering courses that ensure bright career prospects and employment opportunities for our students. We also offer a wide range of job-oriented courses, including: Computer Courses, Teacher Training Programs, All Types"
        );
      }
    };

    fetchAboutUs();
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      const contactDoc = await getDoc(doc(db, "siteContent", "contact"));
      if (contactDoc.exists()) {
        const data = contactDoc.data();
        setContactAddress(data.address || "Panchami Plaza,Uppala,Kasaragod");
        setContactPhone(data.phone || "+91 8289986734");
        setContactEmail(data.email || "adarshtechuppala@gmail.com");
        setContactHours(data.hours || "Monday - Saturday: 9:00 AM - 5:00 PM");
        setAdmissionFormLink(
          typeof data.admissionFormLink === "string"
            ? data.admissionFormLink
            : DEFAULT_ADMISSION_FORM_LINK
        );
      } else {
        setContactAddress("Panchami Plaza,Uppala,Kasaragod");
        setContactPhone("+91 8289986734");
        setContactEmail("adarshtechuppala@gmail.com");
        setContactHours("Monday - Saturday: 9:00 AM - 5:00 PM");
        setAdmissionFormLink(DEFAULT_ADMISSION_FORM_LINK);
      }
    };

    fetchContact();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesSnapshot, gallerySnapshot] = await Promise.all([
          getCountFromServer(collection(db, "courses")),
          getCountFromServer(collection(db, "gallery")),
        ]);

        setStats({
          coursesCount: coursesSnapshot.data().count,
          galleryCount: gallerySnapshot.data().count,
          loading: false,
        });
      } catch {
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchCollegeUpdates = async () => {
      const updatesDoc = await getDoc(doc(db, "siteContent", "updates"));
      if (updatesDoc.exists()) {
        const data = updatesDoc.data();
        const updates = Array.isArray(data.items)
          ? data.items.filter((item) => typeof item === "string")
          : [];
        setCollegeUpdates(
          updates.length > 0 ? updates : DEFAULT_COLLEGE_UPDATES
        );
      } else {
        setCollegeUpdates(DEFAULT_COLLEGE_UPDATES);
      }
    };

    fetchCollegeUpdates();
  }, []);

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login", { replace: true });
  };

  const handleChangePassword = async () => {
    if (!user || !user.email) {
      toast({
        title: "Change Password Failed",
        description: "No authenticated user found.",
        variant: "destructive",
      });
      return;
    }

    if (user.email.toLowerCase() !== FIXED_ADMIN_EMAIL.toLowerCase()) {
      toast({
        title: "Not Allowed",
        description: "Only the fixed admin account can change password.",
        variant: "destructive",
      });
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill current password and new password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "New password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast({
        title: "Password Updated",
        description: "Your admin password has been changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordOpen(false);
    } catch {
      toast({
        title: "Update Failed",
        description: "Current password is incorrect or update failed.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const adminActions = [
    {
      title: "Manage Courses",
      description: "Add, edit, or remove courses from the catalog",
      icon: BookOpen,
      action: () => navigate("/courses"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Manage Gallery",
      description: "Upload or remove images from the gallery",
      icon: Image,
      action: () => navigate("/gallery"),
      color: "bg-green-100 text-green-600",
    },
  ];

  const handleUpdateChange = (index: number, value: string) => {
    setCollegeUpdates((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item))
    );
  };

  const handleAddUpdate = () => {
    const trimmedValue = newUpdateText.trim();
    if (!trimmedValue) {
      return;
    }

    setCollegeUpdates((prev) => [...prev, trimmedValue]);
    setNewUpdateText("");
  };

  const handleRemoveUpdate = (index: number) => {
    setCollegeUpdates((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSaveUpdates = async () => {
    const cleanedUpdates = collegeUpdates
      .map((item) => item.trim())
      .filter(Boolean);

    await setDoc(doc(db, "siteContent", "updates"), {
      items: cleanedUpdates,
    });

    setCollegeUpdates(
      cleanedUpdates.length > 0 ? cleanedUpdates : DEFAULT_COLLEGE_UPDATES
    );
    setUpdatesOpen(false);
    toast({ title: "Important updates saved!" });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Welcome back! Manage your institute's content and settings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setPasswordOpen(true)}>
              Change Password
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {stats.loading ? "..." : stats.coursesCount}
                </p>
                <p className="text-gray-600">Total Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {stats.loading ? "..." : stats.galleryCount}
                </p>
                <p className="text-gray-600">Gallery Images</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">100%</p>
                <p className="text-gray-600">Uptime</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminActions.map((action, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={action.action}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color} mb-4`}
                >
                  <action.icon className="w-6 h-6" />
                </div>
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setAboutUsOpen(true)}
          >
            <CardHeader>
              <CardTitle>Edit About Us</CardTitle>
              <CardDescription>
                Update the About Us section on the home page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit
              </Button>
            </CardContent>
          </Card>
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setContactOpen(true)}
          >
            <CardHeader>
              <CardTitle>Edit Contact</CardTitle>
              <CardDescription>
                Update the Contact section details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit
              </Button>
            </CardContent>
          </Card>
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setUpdatesOpen(true)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-blue-600" />
                Edit Important Updates
              </CardTitle>
              <CardDescription>
                Manage slideshow texts shown on the home page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit
              </Button>
            </CardContent>
          </Card>
        </div>

        <Dialog open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit About Us</DialogTitle>
            </DialogHeader>
            <Textarea
              value={aboutUsText}
              onChange={(e) => setAboutUsText(e.target.value)}
              rows={8}
            />
            <DialogFooter>
              <Button
                onClick={async () => {
                  await setDoc(doc(db, "siteContent", "about"), {
                    text: aboutUsText,
                  });
                  setAboutUsOpen(false);
                  toast({ title: "About Us updated!" });
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Contact Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Address</Label>
              <Input
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
              />
              <Label>Phone</Label>
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              <Label>Email</Label>
              <Input
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <Label>Office Hours</Label>
              <Input
                value={contactHours}
                onChange={(e) => setContactHours(e.target.value)}
              />
              <Label>Admission Google Form Link</Label>
              <Input
                value={admissionFormLink}
                onChange={(e) => setAdmissionFormLink(e.target.value)}
                placeholder="Leave empty to hide Apply button"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={async () => {
                  await setDoc(doc(db, "siteContent", "contact"), {
                    address: contactAddress,
                    phone: contactPhone,
                    email: contactEmail,
                    hours: contactHours,
                    admissionFormLink,
                  });
                  setContactOpen(false);
                  toast({ title: "Contact details updated!" });
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Admin Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={updatesOpen} onOpenChange={setUpdatesOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Important Updates</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {collegeUpdates.map((update, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={update}
                    onChange={(e) => handleUpdateChange(index, e.target.value)}
                    placeholder={`Update ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveUpdate(index)}
                    aria-label={`Delete update ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newUpdateText}
                  onChange={(e) => setNewUpdateText(e.target.value)}
                  placeholder="Add new update text"
                />
                <Button type="button" variant="outline" onClick={handleAddUpdate}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveUpdates}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>- Last login: {new Date().toLocaleDateString()}</li>
                  <li>- Total courses: {stats.coursesCount}</li>
                  <li>- Total images: {stats.galleryCount}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Admin Privileges</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>- Add/Edit/Delete Courses</li>
                  <li>- Manage Gallery Images</li>
                  <li>- Access Analytics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
