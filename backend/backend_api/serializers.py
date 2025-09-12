import cloudinary.uploader
from rest_framework import serializers
from .models import User, Hotel

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'created_at', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class HotelSerializer(serializers.ModelSerializer):
    # Tells DRF to call get_image()
    image = serializers.SerializerMethodField()  
    class Meta:
        model = Hotel
        fields = "__all__"
        read_only_fields = ["user"]

    def get_image(self, obj):
        """
        Ensure the image field always returns a valid absolute URL.
        """
        if not obj.image:
            return None
        print(obj)
        # if it's a Cloudinary URL or any external link
        if str(obj.image).startswith("http"):
            return str(obj.image)

        # otherwise build an absolute URL for local uploads
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)

    def create(self, validated_data):
        request = self.context.get("request")
        image_file = request.FILES.get("image")  # get uploaded file

        if image_file:
            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(image_file)
            validated_data["image"] = upload_result.get("secure_url")
        # attach the user from request
        validated_data["user"] = request.user  
        return super().create(validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()