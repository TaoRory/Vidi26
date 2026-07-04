export type Lang = "vi" | "en";

export const translations = {
  vi: {
    header: {
      nav: {
        dashboard: "Dashboard",
        timeline: "Timeline",
        leaderboard: "Leaderboard",
        announcement: "Thông Báo",
      },
      countdown: { day: "ngày", hour: "giờ", minute: "phút", second: "giây" },
    },
    hero: {
      badge: "VIDI26 Express · 09.07.2026",
      subtitle: "Trạm Kế Tiếp",
      description:
        "Chuyến tàu VIDI26 đang chờ khởi hành. Cùng LEXCE và hơn 300 Cohort-7-to-be vượt qua từng trạm thử thách, thu thập năng lượng và đưa hành trình về đích VinUni.",
      cta_board: "Lên tàu thôi",
      cta_story: "Câu chuyện",
      link_timeline: "Timeline",
      link_leaderboard: "Leaderboard",
      link_announcements: "Thông báo",
    },
    story: {
      status: "VIDI26 EXPRESS · SIGNAL RECEIVED · ĐANG GIẢI MÃ...",
      title: "Câu",
      title_highlight: "Chuyện",
      subtitle: "VIDI26 · NEXT STATION",
      close: "Đóng ×",
      footer_status: "NEXT STOP · VINUNIVERSITY · 09.07.2026",
      paragraphs: [
        `Sau kỳ thi THPT, mỗi học sinh đều đứng trước một bước chuyển mình quan trọng: rời khỏi hành trình quen thuộc để bước vào một chặng đường hoàn toàn mới. Nhưng "trạm kế tiếp" sẽ là đâu, và mình cần chuẩn bị gì để sẵn sàng cho bước tiếp theo?`,
        `Trên đường rời khỏi Lexceverse, LEXCE cần lên chuyến tàu VIDI26 — chuyến tàu duy nhất có thể đưa LEXCE trở về VinUni. Nhưng lần này, LEXCE không đi một mình. Đồng hành cùng LEXCE là hơn 300 người bạn Cohort-7-to-be, những người cũng đang đi tìm trạm kế tiếp của riêng mình.`,
        `Tuy nhiên, chuyến tàu VIDI26 chưa thể khởi động vì nguồn năng lượng đã bị phân tán tại các trạm khác nhau. Để đưa chuyến tàu trở về VinUni, LEXCE và các bạn cần cùng nhau vượt qua từng trạm thử thách, thu thập đủ đồng xu năng lượng và khôi phục hành trình.`,
        `Liệu LEXCE và hơn 300 Cohort-7-to-be có thể cùng nhau mở khóa các trạm kế tiếp? Câu trả lời sẽ phụ thuộc vào sự đoàn kết, đồng lòng và tinh thần sẵn sàng bứt phá của tất cả các bạn trong hành trình VIDI26.`,
      ],
    },
    agenda: {
      title: "Hành",
      title_highlight: "Trình",
      subtitle: "AGENDA · 09–11.07.2026 · 3N2Đ",
      description:
        "Chuyến tàu VIDI26 Express khởi hành 09.07.2026 - 3 ngày 2 đêm, 7 trạm thử thách, 26 đội thi đua.",
      station_prefix: "Trạm",
      day_labels: ["Ngày 1", "Ngày 2", "Ngày 3"],
      main_activities: "Hoạt động chính",
      final_num: "FINAL",
      final_name: "VINUNI",
    },
    leaderboard: {
      description:
        "Bảng xếp hạng theo thời gian thực. Mỗi đội vượt qua thử thách, điểm cập nhật ngay lập tức.",
    },
    home: {
      announcements_title: "Thông Báo",
      see_all: "Xem tất cả",
      no_data: "Trạm này chưa có dữ liệu, quay lại sau",
      pinned: "Ghim",
      leaderboard_title: "Bảng Xếp Hạng",
      view_full: "Xem full",
      view_full_leaderboard: "Xem bảng xếp hạng đầy đủ",
    },
    leaderboard_live: {
      all: "Tất cả",
      board_label: "Bảng xếp hạng",
      teams_unit: "đội",
      empty: "Đang đồng bộ tín hiệu... quay lại sau",
      refresh: "Làm mới",
      challenges: "thử thách",
      score_unit: "điểm",
    },
    mini_leaderboard: {
      loading: "Đang đồng bộ tín hiệu...",
      challenges: "thử thách",
      updated: "cập nhật",
    },
    footer: {
      journey_label: "Hành Trình",
      links_label: "Liên kết",
      links: {
        leaderboard: "Bảng xếp hạng",
        teams: "Danh sách đội",
        gallery: "Gallery",
        announcements: "Thông báo",
      },
      final_badge: "★ ĐIỂM ĐẾN CUỐI CÙNG ★",
      final_stop: "FINAL STOP",
      final_name: "VinUni",
      final_sub: "VinUniversity · Hà Nội",
      next_station: "NEXT STATION",
      copyright: "© 2026 VIDI26 — VinUni Discovery. LEXCE ★ Lead · Explore · Connect · Empower",
      tagline: "YOU · US · FUTURE",
      station_prefix: "Trạm",
    },
  },
  en: {
    header: {
      nav: {
        dashboard: "Dashboard",
        timeline: "Timeline",
        leaderboard: "Leaderboard",
        announcement: "News",
      },
      countdown: { day: "days", hour: "hrs", minute: "min", second: "sec" },
    },
    hero: {
      badge: "VIDI26 Express · 09.07.2026",
      subtitle: "Next Station",
      description:
        "The VIDI26 train is ready to depart. Join LEXCE and 300+ Cohort-7-to-be across every challenge station, collecting energy and bringing the journey home to VinUni.",
      cta_board: "All Aboard",
      cta_story: "Our Story",
      link_timeline: "Timeline",
      link_leaderboard: "Leaderboard",
      link_announcements: "Announcements",
    },
    story: {
      status: "VIDI26 EXPRESS · SIGNAL RECEIVED · DECODING...",
      title: "Our",
      title_highlight: "Story",
      subtitle: "VIDI26 · NEXT STATION",
      close: "Close ×",
      footer_status: "NEXT STOP · VINUNIVERSITY · 09.07.2026",
      paragraphs: [
        `After high school graduation, every student stands at a pivotal turning point: leaving behind the familiar to step into something entirely new. But where is the "next station," and what does it take to be ready for what comes next?`,
        `On the way back from Lexceverse, LEXCE must board the VIDI26 train — the only train that can bring LEXCE home to VinUni. But this time, LEXCE isn't traveling alone. Joining the journey are 300+ Cohort-7-to-be, each searching for their own next station.`,
        `However, the VIDI26 train cannot depart — its energy has been scattered across different stations. To bring the train back to VinUni, LEXCE and everyone must work together through each challenge station, collecting energy coins and restoring the journey.`,
        `Can LEXCE and 300+ Cohort-7-to-be unlock the next stations together? The answer depends on the unity, solidarity, and spirit of every person ready to break through in the VIDI26 journey.`,
      ],
    },
    agenda: {
      title: "Our",
      title_highlight: "Journey",
      subtitle: "AGENDA · 09–11.07.2026 · 3D2N",
      description:
        "VIDI26 Express departs 09.07.2026 - 3 days 2 nights, 7 challenge stations, 26 competing teams.",
      station_prefix: "Station",
      day_labels: ["Day 1", "Day 2", "Day 3"],
      main_activities: "Main activities",
      final_num: "FINAL",
      final_name: "VINUNI",
    },
    leaderboard: {
      description:
        "Real-time leaderboard. Every team that completes a challenge sees their score update instantly.",
    },
    home: {
      announcements_title: "Announcements",
      see_all: "See all",
      no_data: "No data here yet, check back soon",
      pinned: "Pinned",
      leaderboard_title: "Leaderboard",
      view_full: "See all",
      view_full_leaderboard: "View full leaderboard",
    },
    leaderboard_live: {
      all: "All",
      board_label: "Leaderboard",
      teams_unit: "teams",
      empty: "Syncing data... check back soon",
      refresh: "Refresh",
      challenges: "challenges",
      score_unit: "pts",
    },
    mini_leaderboard: {
      loading: "Loading...",
      challenges: "challenges",
      updated: "updated",
    },
    footer: {
      journey_label: "Journey",
      links_label: "Links",
      links: {
        leaderboard: "Leaderboard",
        teams: "Teams",
        gallery: "Gallery",
        announcements: "Announcements",
      },
      final_badge: "★ FINAL DESTINATION ★",
      final_stop: "FINAL STOP",
      final_name: "VinUni",
      final_sub: "VinUniversity · Hanoi",
      next_station: "NEXT STATION",
      copyright: "© 2026 VIDI26 — VinUni Discovery. LEXCE ★ Lead · Explore · Connect · Empower",
      tagline: "YOU · US · FUTURE",
      station_prefix: "Station",
    },
  },
};

export type T = typeof translations["vi"];
