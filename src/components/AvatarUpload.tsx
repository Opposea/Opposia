import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarUpdate: (url: string) => void;
  name?: string;
  className?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  onAvatarUpdate,
  name,
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      // Create unique filename with user folder structure
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) {
        toast.error(`Failed to upload: ${uploadError.message}`);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-photos')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) {
        toast.error(`Failed to update profile: ${updateError.message}`);
        return;
      }

      // Add cache-busting parameter to force browser to reload image
      const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;
      onAvatarUpdate(cacheBustedUrl);
      toast.success('Profile picture updated successfully!');
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      toast.error(`Error: ${error.message || 'An error occurred while uploading'}`);
    } finally {
      setUploading(false);
      // Clear the input so the same file can be selected again
      event.target.value = '';
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <Avatar className="w-48 h-48 border-4 border-primary/20 shadow-2xl">
        <AvatarImage src={currentAvatarUrl} />
        <AvatarFallback className="text-5xl bg-gradient-to-br from-primary to-secondary text-white">
          {name?.charAt(0) || user?.email?.charAt(0) || '?'}
        </AvatarFallback>
      </Avatar>
      
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
          <div className="text-white text-center">
            {uploading ? (
              <div className="animate-spin text-4xl">⏳</div>
            ) : (
              <Camera className="w-10 h-10 mx-auto" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default AvatarUpload;