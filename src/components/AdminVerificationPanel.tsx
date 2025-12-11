import React, { useState } from 'react';
import { Shield, Check, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsAdmin } from '@/hooks/useIsAdmin';

interface AdminVerificationPanelProps {
  userId: string;
  profileId: string;
  currentlyVerified: boolean;
  userCountry?: string;
  dateOfBirth?: string;
  verificationSelfieUrl?: string | null;
  onVerificationChange?: () => void;
}

const AdminVerificationPanel: React.FC<AdminVerificationPanelProps> = ({
  userId,
  profileId,
  currentlyVerified,
  userCountry,
  dateOfBirth,
  verificationSelfieUrl,
  onVerificationChange
}) => {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const [verifying, setVerifying] = useState(false);

  if (adminLoading || !isAdmin) {
    return null;
  }

  const handleVerify = async (verified: boolean) => {
    setVerifying(true);
    try {
      // If verifying, delete the selfie from storage and clear the URL
      if (verified && verificationSelfieUrl) {
        // Extract the file path from the URL
        const urlParts = verificationSelfieUrl.split('/verification-selfies/');
        if (urlParts.length > 1) {
          const filePath = decodeURIComponent(urlParts[1]);
          
          // Delete from storage
          const { error: deleteError } = await supabase.storage
            .from('verification-selfies')
            .remove([filePath]);
          
          if (deleteError) {
            console.error('Error deleting selfie from storage:', deleteError);
            // Continue anyway - verification is more important
          }
        }
      }

      // Update profile: set verification status and clear selfie URL if verified
      const updateData: { age_verified: boolean; verification_selfie_url?: null } = { 
        age_verified: verified 
      };
      
      if (verified) {
        updateData.verification_selfie_url = null;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profileId);

      if (error) throw error;

      toast.success(verified 
        ? 'User age verified successfully - selfie data deleted' 
        : 'Verification removed');
      onVerificationChange?.();
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to update verification status');
    } finally {
      setVerifying(false);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-amber-600" />
          Admin Verification Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Verification Selfie */}
        {verificationSelfieUrl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Camera className="w-4 h-4" />
              Verification Selfie
            </div>
            <img
              src={verificationSelfieUrl}
              alt="Verification selfie"
              className="w-full max-w-md h-48 object-cover rounded-lg border-2"
            />
          </div>
        )}
        {!verificationSelfieUrl && (
          <div className="text-sm text-muted-foreground italic">
            No verification selfie uploaded yet
          </div>
        )}
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Country:</span>
            <span>{userCountry || 'Not specified'}</span>
          </div>
          {dateOfBirth && (
            <div className="flex justify-between">
              <span className="font-medium">Date of Birth:</span>
              <span>{new Date(dateOfBirth).toLocaleDateString()}</span>
            </div>
          )}
          {dateOfBirth && (
            <div className="flex justify-between">
              <span className="font-medium">Calculated Age:</span>
              <span className={calculateAge(dateOfBirth) >= 18 ? 'text-green-600' : 'text-red-600'}>
                {calculateAge(dateOfBirth)} years
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium">Verification Status:</span>
            <span className={currentlyVerified ? 'text-green-600' : 'text-amber-600'}>
              {currentlyVerified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => handleVerify(true)}
            disabled={verifying}
            className="flex-1 bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Check className="w-4 h-4 mr-2" />
            Verify Age
          </Button>
          <Button
            onClick={() => handleVerify(false)}
            disabled={verifying}
            variant="destructive"
            className="flex-1"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Remove Verification
          </Button>
        </div>

        <p className="text-xs text-muted-foreground italic">
          ⚠️ When verified, the selfie will be automatically deleted from storage for privacy compliance.
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminVerificationPanel;
