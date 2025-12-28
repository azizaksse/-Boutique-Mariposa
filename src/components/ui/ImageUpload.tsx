import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

interface ImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    bucket: string;
    multiple?: boolean;
}

export function ImageUpload({ value = [], onChange, bucket, multiple = false }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const newUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                }

                const { data } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(filePath);

                newUrls.push(data.publicUrl);
            }

            onChange(multiple ? [...value, ...newUrls] : newUrls);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        onChange(value.filter((url) => url !== urlToRemove));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative h-24 w-24 overflow-hidden rounded-lg border border-secondary-200">
                        <div className="absolute right-1 top-1 z-10">
                            <button
                                type="button"
                                onClick={() => removeImage(url)}
                                className="rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                        <img src={url} alt="Uploaded" className="h-full w-full object-cover" />
                    </div>
                ))}

                {(!value.length || multiple) && (
                    <label className={cn(
                        "flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-secondary-300 bg-secondary-50 hover:bg-secondary-100",
                        uploading && "opacity-50 cursor-not-allowed"
                    )}>
                        {uploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-secondary-400" />
                        ) : (
                            <Upload className="h-6 w-6 text-secondary-400" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            multiple={multiple}
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}
