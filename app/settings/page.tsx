"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [profileModalOpen, setProfileModalOpen] = React.useState(false);
  const [companyModalOpen, setCompanyModalOpen] = React.useState(false);

  const [profile, setProfile] = React.useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
  });

  const [company, setCompany] = React.useState({
    name: "PT. Kontraktor Abadi",
    address: "Jl. Raya No. 123, Jakarta",
    npwp: "01.234.567.8-901.000",
    phone: "0812-3456-7890",
  });

  const handleSaveProfile = () => {
    alert("Profile saved (dummy)");
    setProfileModalOpen(false);
  };

  const handleSaveCompany = () => {
    alert("Company info saved (dummy)");
    setCompanyModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Profile Card */}
      <div className="bg-white shadow-sm rounded border border-gray-300 p-4 mb-6 flex justify-between items-center">
        <div>
          <div className="text-gray-600 font-medium">Profile</div>
          <div className="text-gray-900 font-bold">{profile.name}</div>
        </div>
        <Button onClick={() => setProfileModalOpen(true)}>Edit</Button>
      </div>

      {/* Company Info Card */}
      <div className="bg-white shadow-sm rounded border border-gray-300 p-4 mb-6 flex justify-between items-center">
        <div>
          <div className="text-gray-600 font-medium">Company Info</div>
          <div className="text-gray-900 font-bold">{company.name}</div>
        </div>
        <Button onClick={() => setCompanyModalOpen(true)}>Edit</Button>
      </div>

      {/* Profile Modal */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setProfileModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Company Modal */}
      <Dialog open={companyModalOpen} onOpenChange={setCompanyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Company Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Company Name"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={company.address}
              onChange={(e) =>
                setCompany({ ...company, address: e.target.value })
              }
            />
            <Input
              placeholder="NPWP"
              value={company.npwp}
              onChange={(e) => setCompany({ ...company, npwp: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={company.phone}
              onChange={(e) =>
                setCompany({ ...company, phone: e.target.value })
              }
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setCompanyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveCompany}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
