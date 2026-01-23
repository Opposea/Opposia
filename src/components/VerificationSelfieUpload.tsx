import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface VerificationSelfieUploadProps {
  onComplete?: () => void;
  currentSelfieUrl?: string | null;
}

export const VerificationSelfieUpload = ({ onComplete, currentSelfieUrl }: VerificationSelfieUploadProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentSelfieUrl || null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Upload to storage first
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/verification-selfie.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('verification-selfies')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('verification-selfies')
        .getPublicUrl(filePath);

      // Update preview to actual URL
      setPreviewUrl(publicUrl);

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ verification_selfie_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      toast.success("Verification selfie uploaded successfully");
      onComplete?.();
    } catch (error: any) {
      console.error('Error uploading selfie:', error);
      toast.error(error.message || "Failed to upload selfie");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return;

    try {
      setUploading(true);

      // Delete from storage
      const filePath = previewUrl?.split('/').slice(-2).join('/');
      if (filePath) {
        await supabase.storage
          .from('verification-selfies')
          .remove([filePath]);
      }

      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({ verification_selfie_url: null })
        .eq('user_id', user.id);

      if (error) throw error;

      setPreviewUrl(null);
      toast.success("Verification selfie removed");
    } catch (error: any) {
      console.error('Error removing selfie:', error);
      toast.error("Failed to remove selfie");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Age Verification Selfie
        </CardTitle>
        <CardDescription>
          Upload a clear selfie for age verification. We know this feels intrusive, but it's UK law we need to implement. To avoid storing this data long-term or sending it to third parties, this will be quickly reviewed manually by the admin and you can delete it as soon as your age has been verified. <strong>Please allow 24–48 hours for verification</strong> — we'll update your account as soon as it's complete. Thank you for understanding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Verification selfie"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              No verification selfie uploaded yet
            </p>
            <label htmlFor="selfie-upload">
              <Button disabled={uploading} asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload Selfie"}
                </span>
              </Button>
              <input
                id="selfie-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
