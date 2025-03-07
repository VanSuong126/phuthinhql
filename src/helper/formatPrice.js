export default function formatPrice (price) {
    if (!price) return '0';
    return new Intl.NumberFormat('vi-VN').format(price);
  };