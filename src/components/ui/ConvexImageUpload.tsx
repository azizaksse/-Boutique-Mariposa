import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Upload, X, Loader2 } from "lucide-react";

interface ConvexImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    multiple?: boolean;
}

export function ConvexImageUpload({ value = [], onChange, multiple = false }: ConvexImageUploadProps) {
    const generateUploadUrl = useMutation(api.products.generateUploadUrl);
    const imageInput = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        setUploading(true);

        const newStorageIds: string[] = [];
        const newPreviews: Record<string, string> = {};

        try {
            for (const file of files) {
                // Step 1: Get a short-lived upload URL
                const postUrl = await generateUploadUrl();

                // Step 2: POST the file to the URL
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                const { storageId } = await result.json();

                newStorageIds.push(storageId);
                newPreviews[storageId] = URL.createObjectURL(file);
            }

            setLocalPreviews(prev => ({ ...prev, ...newPreviews }));
            onChange(multiple ? [...value, ...newStorageIds] : newStorageIds);

        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
            if (imageInput.current) {
                imageInput.current.value = "";
            }
        }
    }

    const removeImage = (urlToRemove: string) => {
        onChange(value.filter((url) => url !== urlToRemove));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {value.map((url, index) => {
                    const isUrl = url.startsWith("http") || url.startsWith("/");
                    const imgSrc = isUrl ? url : (localPreviews[url] || "https://placehold.co/100x100?text=Processing...");

                    return (
                        <div key={index} className="relative h-24 w-24 overflow-hidden rounded-lg border border-secondary-200">
                            <div className="absolute right-1 top-1 z-10">
                                <button
                                    type="button"
                                    onClick={() => removeImage(url)}
                                    className="rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                            <img
                                src={imgSrc}
                                alt="Uploaded"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    );
                })}

                {(!value.length || multiple) && (
                    <label className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-secondary-300 bg-secondary-50 hover:bg-secondary-100 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {uploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-secondary-400" />
                        ) : (
                            <Upload className="h-6 w-6 text-secondary-400" />
                        )}
                        <input
                            ref={imageInput}
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
            <p className="text-xs text-gray-500">
                {uploading ? "Uploading..." : "Click to upload images"}
            </p>
        </div>
    );
}
