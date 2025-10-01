import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Heart, Eye, MessageCircle, Upload } from "lucide-react";
import { toast } from 'react-toastify';
import { PropertyCard } from "./PropertyCard";
import axios from "axios";
import { getWishlist, removeFromWishlist, WishlistItem } from "@/lib/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCurrentUser = (): any | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const fetchUserWishlist = async () => {
    setLoadingWishlist(true);
    try {
      const data = await getWishlist();
      setWishlistItems(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
      });
      setProfileImage(user.profile_image || "");
    }
    fetchUserWishlist();

    const handleFocus = () => {
      fetchUserWishlist();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        fetchUserWishlist();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleRemoveFromWishlist = async (slug: string) => {
    try {
      await removeFromWishlist(slug);
      toast.success("Removed from wishlist!");
      // Refetch the wishlist to update the UI
      fetchUserWishlist();
    } catch (error) {
      toast.error("Failed to remove from wishlist.");
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    const getAuthHeaders = () => {
        const token = localStorage.getItem("access_token");
        if (!token) return {};
        return { Authorization: `Bearer ${token}` };
    };

    try {
      let imageUrl = profileImage;

      if (profileImageFile) {
        const imageData = new FormData();
        imageData.append("profile_image", profileImageFile);

        const res = await axios.post("http://127.0.0.1:8000/api/upload-profile-image/", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...getAuthHeaders(),
          },
        });
        imageUrl = res.data.profile_image_url;
      }

      const updatedProfile = {
        ...formData,
        profile_image: imageUrl,
      };

      await axios.put("http://127.0.0.1:8000/api/update-profile/", updatedProfile, {
        headers: getAuthHeaders(),
      });

      const currentUser = getCurrentUser();
      if (currentUser) {
        const updatedUser = { 
          ...currentUser, 
          ...formData, 
          profile_image: imageUrl 
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success("Profile updated successfully!");
      setProfileImage(imageUrl);
      setProfileImagePreview("");
      setProfileImageFile(null);

    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Profile update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="relative inline-block">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src={profileImagePreview || profileImage} />
              <AvatarFallback>{formData.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <h1 className="text-3xl font-bold mt-4">{formData.full_name}</h1>
          <p className="text-muted-foreground">{formData.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-gradient cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Saved Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loadingWishlist ? "..." : wishlistItems.length}</div>
              <p className="text-muted-foreground">Properties in wishlist</p>
            </CardContent>
          </Card>

          <Card className="card-gradient cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Property Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-muted-foreground">Properties viewed</p>
            </CardContent>
          </Card>

          <Card className="card-gradient cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-muted-foreground">Active conversations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  value={formData.full_name} 
                  onChange={(e) => setFormData(prev => ({...prev, full_name: e.target.value}))}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={formData.email} 
                  readOnly
                  className="mt-1" 
                />
              </div>
            </div>
            <Button className="btn-hero" onClick={handleSaveChanges}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Your Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingWishlist ? (
              <div className="text-center py-4">Loading your wishlist...</div>
            ) : wishlistItems.length === 0 ? (
              <div className="text-center py-4">No properties saved to your wishlist yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => {
                  const property = item.property as any; // Cast because the interface is generic
                  return (
                  <PropertyCard
                    key={item.slug}
                    id={property.id.toString()}
                    slug={property.slug}
                    image={
                      property.images?.find((img: any) => img.is_primary)
                        ?.image ||
                      property.images?.[0]?.image ||
                      ""
                    }
                    title={property.title}
                    builder={property.builder || "N/A"}
                    location={property.location}
                    bhkOptions={property.bhkOptions || []}
                    description={property.description}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    price={property.price}
                    amenities={property.amenities || []}
                    isWishlisted={true}
                    onWishlistToggle={() => handleRemoveFromWishlist(item.slug)}
                    isProfileView={true}
                  />
                )})}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;