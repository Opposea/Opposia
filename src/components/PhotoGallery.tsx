import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { X, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Photo {
  id: string;
  photo_url: string;
  display_order: number;
}

interface PhotoGalleryProps {
  userId: string;
  isOwnProfile: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ userId, isOwnProfile }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
  }, [userId]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('user_photos' as any)
        .select('*')
        .eq('user_id', userId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos((data as any) || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Check photo limit (max 6 photos)
    if (photos.length >= 6) {
      toast({
        title: "Photo limit reached",
        description: "You can upload a maximum of 6 photos",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('user-photos')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('user_photos' as any)
        .insert({
          user_id: userId,
          photo_url: publicUrl,
          display_order: photos.length,
        } as any);

      if (insertError) throw insertError;

      toast({
        title: "Photo uploaded",
        description: "Your photo has been added successfully",
      });

      fetchPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = photoUrl.split('/user-photos/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('user-photos').remove([filePath]);
      }

      const { error } = await supabase
        .from('user_photos' as any)
        .delete()
        .eq('id', photoId);

      if (error) throw error;

      toast({
        title: "Photo deleted",
        description: "Your photo has been removed",
      });

      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Photos ({photos.length}/6)</h3>
        {isOwnProfile && (
          <label htmlFor="photo-upload">
            <Button
              variant="outline"
              size="sm"
              disabled={uploading || photos.length >= 6}
              asChild
            >
              <span className="cursor-pointer">
                {uploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" aria-hidden="true" />
                )}
                Upload Photo
              </span>
            </Button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading || photos.length >= 6}
              aria-label="Upload a new photo to your gallery"
            />
          </label>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={photo.id} className="relative group aspect-square">
            <Avatar className="w-full h-full rounded-lg">
              <AvatarImage src={photo.photo_url} alt={`User photo ${index + 1}`} className="object-cover" />
              <AvatarFallback>Photo</AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeletePhoto(photo.id, photo.photo_url)}
                aria-label={`Delete photo ${index + 1}`}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No photos yet</p>
          {isOwnProfile && <p className="text-sm mt-2">Upload photos to show on your profile</p>}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
