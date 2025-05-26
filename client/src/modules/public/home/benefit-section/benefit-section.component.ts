import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-benefit-section',
  imports: [CommonModule],
  templateUrl: './benefit-section.component.html',
  styleUrl: './benefit-section.component.css'
})
export class BenefitSectionComponent {
  benefits = [
    {
      icon: '/assets/icon/it-qldnt.png',
      title: 'Quản lý đa nền tảng',
      description:
        'Sử dụng trình duyệt trên máy tính hoặc ứng dụng trên smartphone với dữ liệu đồng bộ và bảo mật và backup thường xuyên.',
    },
    {
      icon: '/assets/icon/it-lttt.png',
      title: 'Lưu trữ thông tin',
      description:
        'Tất cả thông tin khách thuê được lưu trữ với đầy đủ thông tin. Bạn có thể tra cứu lại thông tin ngay cả khi khách thuê đã chuyển đi.',
    },
    {
      icon: '/assets/icon/it-tkcp.png',
      title: 'Tiết kiệm chi phí',
      description:
        'Hoá đơn được gửi qua app hoặc Zalo, Facebook giúp cho bạn tiết kiệm được chi phí về in ấn và chi phí đi lại.',
    },
    {
      icon: '/assets/icon/it-dlat.png',
      title: 'Dữ liệu an toàn',
      description:
        'Tất cả dữ liệu lưu trữ trên cloud và bảo mật giúp bạn không phải lo lắng mất dữ liệu như dùng với sổ sách hoặc bảng tính excel.',
    },
    {
      icon: '/assets/icon/it-qllh.png',
      title: 'Quản lý linh hoạt',
      description:
        'Dù bạn quản lý theo mô hình truyền thống hay ký túc xá đều có thể áp dụng, các dịch vụ có thể khai báo linh hoạt.',
    },
    {
      icon: '/assets/icon/it-tickt.png',
      title: 'Tiện ích cho khách thuê',
      description:
        'Khách thuê tại nhà bạn có thể tra cứu hoá đơn của họ bất cứ lúc nào mà không cần phải lưu lại các hoá đơn giấy.',
    },
  ];
}
