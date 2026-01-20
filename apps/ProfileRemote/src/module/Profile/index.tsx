// Import CSS to ensure styles are available when component is loaded as remote module
import '@css';

import { View, Text } from 'react-native';

// Components
import ProfileItem from '@repo/ui/components/ProfileItem';
import { LogoutIcon } from '@repo/ui/components/Icons/LogoutIcon';
import { AddressIcon } from '@repo/ui/components/Icons/AddressIcon';
import { WalletIcon } from '@repo/ui/components/Icons/WalletIcon';
import { VoucherIcon } from '@repo/ui/components/Icons/VoucherIcon';
import { HeartIcon } from '@repo/ui/components/Icons/HeartIcon';
import StarIcon from '@repo/ui/components/Icons/StarIcon';

interface ProfileProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  userName = 'User Name',
  userEmail = 'user@example.com',
  onLogout,
}) => {
  const handleGoToAddress = () => {};

  const handleGoToPaymentMethod = () => {};

  const handleGoToVoucher = () => {};

  const handleGoToWishlist = () => {};

  const handleGoToRating = () => {};

  return (
    <View className="px-5 py-4 justify-center mt-10">
      <View className="items-center py-[30px] border-b border-quaternary">
        <View className="mb-4">
          <View className="w-[100px] h-[100px] rounded-full bg-info justify-center items-center">
            <Text className="text-4xl font-bold text-secondary">
              {userName
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-primary mb-1">
          {userName}12323
        </Text>
        <Text className="text-base text-tertiary">{userEmail}</Text>
      </View>

      <View className="bg-white mt-3 py-3">
        <ProfileItem
          title="Address"
          icon={<AddressIcon />}
          onPress={handleGoToAddress}
        />
        <ProfileItem
          title="Payment Method"
          icon={<WalletIcon />}
          onPress={handleGoToPaymentMethod}
        />
        <ProfileItem
          title="Voucher"
          icon={<VoucherIcon />}
          onPress={handleGoToVoucher}
        />
        <ProfileItem
          title="My Wishlist"
          icon={<HeartIcon />}
          onPress={handleGoToWishlist}
        />
        <ProfileItem
          title="Rate this app"
          icon={<StarIcon width={20} height={20} color="currentColor" />}
          onPress={handleGoToRating}
        />

        <ProfileItem
          icon={<LogoutIcon />}
          title="Log out"
          onPress={onLogout || (() => {})}
        />
      </View>
    </View>
  );
};

export default Profile;
