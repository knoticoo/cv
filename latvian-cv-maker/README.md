# 🇱🇻 Latvian CV Maker

A modern, multilingual CV maker specifically tailored for the Latvian job market. Create professional CVs in Latvian, Russian, and English with Europass compatibility and local market optimization.

## ✨ Features

### 🌍 Multilingual Support
- **Latvian** (primary language)
- **Russian** (significant population)
- **English** (international opportunities)
- Real-time language switching
- Localized field labels and instructions

### 📋 CV Sections
- **Personal Information** with photo upload
- **Professional Summary** with character count
- **Work Experience** with achievements tracking
- **Education** with GPA and thesis support
- **Language Skills** (A1-C2 European scale)
- **IT Skills** with proficiency levels
- **Other Skills** with categories
- **References** with contact details

### 🎨 Templates
- **Europass** - Official EU standard
- **Modern Professional** - Clean, contemporary design
- **Traditional Business** - Conservative style
- **Creative Designer** - For creative professions (Premium)
- **IT Specialist** - Optimized for tech roles (Premium)
- **Executive Premium** - Luxury design for senior positions (Premium)

### 🚀 Advanced Features
- **Real-time Preview** - See changes instantly
- **PDF Export** - High-quality PDF generation
- **Auto-save** - Never lose your work
- **Mobile Responsive** - Works on all devices
- **Print Optimization** - Perfect for printing
- **ATS Friendly** - Optimized for applicant tracking systems
- **Privacy Controls** - Secure data handling
- **Local Storage** - Data stays on your device

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Internationalization**: next-intl
- **PDF Generation**: @react-pdf/renderer
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd latvian-cv-maker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── create/         # CV creation page
│   │   ├── templates/      # Template selection
│   │   └── page.tsx        # Homepage
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── forms/              # Form components
│   │   ├── PersonalInfoForm.tsx
│   │   ├── WorkExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── SkillsForm.tsx
│   │   └── ReferencesForm.tsx
│   ├── ui/                 # Reusable UI components
│   ├── CVEditor.tsx        # Main CV editor
│   ├── CVPreview.tsx       # Live preview
│   └── Navigation.tsx      # App navigation
├── i18n/                   # Internationalization
├── lib/                    # Utilities
│   ├── utils.ts           # Common utilities
│   ├── storage.ts         # Local storage management
│   └── pdf-generator.tsx  # PDF generation
├── types/
│   └── cv.ts              # TypeScript interfaces
└── messages/              # Translation files
    ├── lv.json            # Latvian
    ├── ru.json            # Russian
    └── en.json            # English
```

## 🎯 Latvian Market Specific Features

### Local Standards Compliance
- Photo upload support (common in Latvia)
- Europass format compatibility
- Multi-language CV support
- Local address format
- Driving license categories (A, B, C, etc.)

### Job Market Integration (Planned)
- CV.lv integration
- Visidarbi.lv compatibility
- Local job portal API connections
- ATS optimization for Latvian employers

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Languages

1. Create translation file in `messages/[locale].json`
2. Add locale to `src/i18n/routing.ts`
3. Update language utilities in `src/lib/utils.ts`

### Creating New Templates

1. Add template configuration to templates data
2. Create template component in `src/components/templates/`
3. Update PDF generator with new template styles

## 🌟 Roadmap

### Phase 1: MVP ✅
- [x] Basic CV editor with essential sections
- [x] Multilingual support (LV/RU/EN)
- [x] PDF export functionality
- [x] Real-time preview
- [x] Auto-save functionality

### Phase 2: Enhanced Features (In Progress)
- [ ] Advanced templates (Europass, Creative)
- [ ] Cover letter builder
- [ ] Mobile optimization improvements
- [ ] Form validation and error handling

### Phase 3: Integration & Polish
- [ ] Job portal integration research
- [ ] Advanced privacy features
- [ ] Performance optimization
- [ ] User testing and feedback

## 🤝 Contributing

We welcome contributions to improve the Latvian CV Maker! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Create an issue on GitHub
- Email: support@latvian-cv-maker.com
- Documentation: [docs.latvian-cv-maker.com](https://docs.latvian-cv-maker.com)

---

Made with ❤️ for Latvian job seekers