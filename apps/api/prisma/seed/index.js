"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const PLACEHOLDER = '[VERIFIED LEGAL TEXT TO BE INSERTED]';
async function main() {
    console.log('🌱 Seeding Msingi database...');
    // ─── Legal Sources ──────────────────────────────────────────────────────────
    const constitutionSource = await prisma.legalSource.upsert({
        where: { id: 'src-constitution-2010' },
        update: {},
        create: {
            id: 'src-constitution-2010',
            title: 'Constitution of Kenya, 2010',
            sourceType: client_1.SourceType.CONSTITUTION,
            officialUrl: 'https://kenyalaw.org/lex/actview.xql?actid=Const2010',
            version: '2010',
            effectiveDate: new Date('2010-08-27'),
            lastVerified: new Date('2025-01-01'),
        },
    });
    const employmentActSource = await prisma.legalSource.upsert({
        where: { id: 'src-employment-act-2007' },
        update: {},
        create: {
            id: 'src-employment-act-2007',
            title: 'Employment Act, 2007 (Cap 226)',
            sourceType: client_1.SourceType.ACT,
            officialUrl: 'https://kenyalaw.org/lex/actview.xql?actid=No.11of2007',
            version: 'Cap 226',
            effectiveDate: new Date('2007-10-26'),
            lastVerified: new Date('2025-01-01'),
        },
    });
    const landActSource = await prisma.legalSource.upsert({
        where: { id: 'src-land-act-2012' },
        update: {},
        create: {
            id: 'src-land-act-2012',
            title: 'Land Act, 2012 (No. 6 of 2012)',
            sourceType: client_1.SourceType.ACT,
            officialUrl: 'https://kenyalaw.org/lex/actview.xql?actid=No.6of2012',
            version: 'No. 6 of 2012',
            effectiveDate: new Date('2012-05-02'),
            lastVerified: new Date('2025-01-01'),
        },
    });
    // ─── Legal Sections ─────────────────────────────────────────────────────────
    const art49 = await prisma.legalSection.upsert({
        where: { id: 'sec-art49' },
        update: {},
        create: {
            id: 'sec-art49',
            legalSourceId: constitutionSource.id,
            reference: 'Article 49',
            title: 'Rights of arrested persons',
            legalText: PLACEHOLDER,
            keywords: ['arrest', 'arrested', 'detained', 'detention', 'police', 'rights', 'silent', 'advocate', 'court', '24 hours'],
        },
    });
    const art49_1f = await prisma.legalSection.upsert({
        where: { id: 'sec-art49-1f' },
        update: {},
        create: {
            id: 'sec-art49-1f',
            legalSourceId: constitutionSource.id,
            reference: 'Article 49(1)(f)',
            title: '24-hour court appearance rule',
            legalText: PLACEHOLDER,
            parentSectionId: art49.id,
            keywords: ['24 hours', 'court', 'detained', 'arrest', 'magistrate'],
        },
    });
    const art50 = await prisma.legalSection.upsert({
        where: { id: 'sec-art50' },
        update: {},
        create: {
            id: 'sec-art50',
            legalSourceId: constitutionSource.id,
            reference: 'Article 50',
            title: 'Fair hearing',
            legalText: PLACEHOLDER,
            keywords: ['fair trial', 'hearing', 'accused', 'legal representation', 'court'],
        },
    });
    const art31 = await prisma.legalSection.upsert({
        where: { id: 'sec-art31' },
        update: {},
        create: {
            id: 'sec-art31',
            legalSourceId: constitutionSource.id,
            reference: 'Article 31',
            title: 'Privacy',
            legalText: PLACEHOLDER,
            keywords: ['search', 'privacy', 'home', 'property', 'seizure', 'police search'],
        },
    });
    const art40 = await prisma.legalSection.upsert({
        where: { id: 'sec-art40' },
        update: {},
        create: {
            id: 'sec-art40',
            legalSourceId: constitutionSource.id,
            reference: 'Article 40',
            title: 'Protection of right to property',
            legalText: PLACEHOLDER,
            keywords: ['land', 'property', 'ownership', 'title', 'eviction', 'compulsory acquisition'],
        },
    });
    const art41 = await prisma.legalSection.upsert({
        where: { id: 'sec-art41' },
        update: {},
        create: {
            id: 'sec-art41',
            legalSourceId: constitutionSource.id,
            reference: 'Article 41',
            title: 'Labour relations',
            legalText: PLACEHOLDER,
            keywords: ['work', 'labour', 'employment', 'fair labour', 'union', 'strike', 'wages'],
        },
    });
    const employmentSec17 = await prisma.legalSection.upsert({
        where: { id: 'sec-emp-s17' },
        update: {},
        create: {
            id: 'sec-emp-s17',
            legalSourceId: employmentActSource.id,
            reference: 'Section 17',
            title: 'Payment of wages',
            legalText: PLACEHOLDER,
            keywords: ['wages', 'salary', 'payment', 'employer', 'unpaid', 'withheld'],
        },
    });
    const employmentSec45 = await prisma.legalSection.upsert({
        where: { id: 'sec-emp-s45' },
        update: {},
        create: {
            id: 'sec-emp-s45',
            legalSourceId: employmentActSource.id,
            reference: 'Section 45',
            title: 'Unfair termination',
            legalText: PLACEHOLDER,
            keywords: ['dismissed', 'fired', 'termination', 'unfair dismissal', 'redundancy'],
        },
    });
    const art46 = await prisma.legalSection.upsert({
        where: { id: 'sec-art46' },
        update: {},
        create: {
            id: 'sec-art46',
            legalSourceId: constitutionSource.id,
            reference: 'Article 46',
            title: 'Consumer rights',
            legalText: PLACEHOLDER,
            keywords: ['consumer', 'goods', 'trader', 'business', 'confiscated', 'licence', 'county'],
        },
    });
    // ─── Categories ─────────────────────────────────────────────────────────────
    const catPolice = await prisma.category.upsert({
        where: { slug: 'police-arrests' },
        update: {},
        create: {
            name: 'Police & Arrests',
            slug: 'police-arrests',
            description: 'Understand your rights when dealing with police, from arrest and detention to reporting misconduct.',
            icon: 'local_police',
        },
    });
    const catLand = await prisma.category.upsert({
        where: { slug: 'land-property' },
        update: {},
        create: {
            name: 'Land & Property',
            slug: 'land-property',
            description: 'Know your rights around land ownership, boundary disputes, landlord issues, and property protection.',
            icon: 'home',
        },
    });
    const catWork = await prisma.category.upsert({
        where: { slug: 'work-labour' },
        update: {},
        create: {
            name: 'Work & Labour',
            slug: 'work-labour',
            description: 'Understand your employment rights, from unpaid wages and dismissal to workplace discrimination.',
            icon: 'work',
        },
    });
    const catBusiness = await prisma.category.upsert({
        where: { slug: 'business-traders' },
        update: {},
        create: {
            name: 'Business & Traders',
            slug: 'business-traders',
            description: 'Know your rights as a trader or business owner when dealing with county officials, licences, and disputes.',
            icon: 'storefront',
        },
    });
    // ─── Situations: Police & Arrests ───────────────────────────────────────────
    const sitArrested = await prisma.situation.upsert({
        where: { slug: 'ive-been-arrested' },
        update: {},
        create: {
            categoryId: catPolice.id,
            title: "I've been arrested",
            slug: 'ive-been-arrested',
            description: 'Your rights when police place you under arrest.',
            searchKeywords: ['arrested', 'arrest', 'police arrested me', 'taken by police', 'handcuffed', 'apprehended'],
        },
    });
    const sitSearch = await prisma.situation.upsert({
        where: { slug: 'police-want-to-search-me' },
        update: {},
        create: {
            categoryId: catPolice.id,
            title: 'Police want to search me',
            slug: 'police-want-to-search-me',
            description: 'Your rights when police want to search your person, home, or property.',
            searchKeywords: ['search', 'police search', 'search my house', 'search my phone', 'body search', 'search warrant'],
        },
    });
    const sitDetained = await prisma.situation.upsert({
        where: { slug: 'im-being-detained' },
        update: {},
        create: {
            categoryId: catPolice.id,
            title: "I'm being detained",
            slug: 'im-being-detained',
            description: 'Your rights when held in police custody or a detention facility.',
            searchKeywords: ['detained', 'detention', 'held in custody', 'locked up', 'cell', 'police station'],
        },
    });
    const sitQuestioned = await prisma.situation.upsert({
        where: { slug: 'police-are-questioning-me' },
        update: {},
        create: {
            categoryId: catPolice.id,
            title: 'Police are questioning me',
            slug: 'police-are-questioning-me',
            description: 'Your rights during police questioning or interrogation.',
            searchKeywords: ['questioning', 'interrogation', 'police questions', 'statement', 'interview', 'questioned'],
        },
    });
    const sitPropertyTaken = await prisma.situation.upsert({
        where: { slug: 'police-have-taken-my-property' },
        update: {},
        create: {
            categoryId: catPolice.id,
            title: 'Police have taken my property',
            slug: 'police-have-taken-my-property',
            description: 'What to do when police seize or confiscate your belongings.',
            searchKeywords: ['property taken', 'seized', 'confiscated by police', 'phone taken', 'goods taken', 'impounded'],
        },
    });
    const sitMisconduct = await prisma.situation.upsert({
        where: { slug: 'i-want-to-report-police-misconduct' },
        update: {},
        create: {
            categoryId: catPolice.id,
            title: 'I want to report police misconduct',
            slug: 'i-want-to-report-police-misconduct',
            description: 'How to report police brutality, corruption, or abuse of power.',
            searchKeywords: ['misconduct', 'police brutality', 'report police', 'IPOA', 'abuse', 'corruption', 'complaint'],
        },
    });
    // ─── Situations: Land & Property ────────────────────────────────────────────
    const sitLandClaim = await prisma.situation.upsert({
        where: { slug: 'someone-is-claiming-my-land' },
        update: {},
        create: {
            categoryId: catLand.id,
            title: 'Someone is claiming my land',
            slug: 'someone-is-claiming-my-land',
            description: 'What to do when another person disputes your ownership of land.',
            searchKeywords: ['land claim', 'claiming my land', 'land dispute', 'ownership dispute', 'title deed', 'land grabbed'],
        },
    });
    const sitBoundary = await prisma.situation.upsert({
        where: { slug: 'i-have-a-boundary-dispute' },
        update: {},
        create: {
            categoryId: catLand.id,
            title: 'I have a boundary dispute',
            slug: 'i-have-a-boundary-dispute',
            description: 'Resolving disagreements about where your land boundary lies.',
            searchKeywords: ['boundary', 'fence', 'neighbour dispute', 'land boundary', 'survey', 'encroachment'],
        },
    });
    const sitLandlord = await prisma.situation.upsert({
        where: { slug: 'i-have-a-landlord-or-tenant-problem' },
        update: {},
        create: {
            categoryId: catLand.id,
            title: 'I have a landlord or tenant problem',
            slug: 'i-have-a-landlord-or-tenant-problem',
            description: 'Rights and obligations for landlords and tenants in Kenya.',
            searchKeywords: ['landlord', 'tenant', 'rent', 'eviction', 'notice to vacate', 'rental dispute', 'house'],
        },
    });
    const sitPropertyThreat = await prisma.situation.upsert({
        where: { slug: 'someone-is-trying-to-take-my-property' },
        update: {},
        create: {
            categoryId: catLand.id,
            title: 'Someone is trying to take my property',
            slug: 'someone-is-trying-to-take-my-property',
            description: 'Protecting your property from unlawful seizure or forced acquisition.',
            searchKeywords: ['take my property', 'forced off land', 'evicted', 'compulsory acquisition', 'government taking land'],
        },
    });
    const sitLandProblem = await prisma.situation.upsert({
        where: { slug: 'i-bought-land-and-there-is-a-problem' },
        update: {},
        create: {
            categoryId: catLand.id,
            title: 'I bought land and there is a problem',
            slug: 'i-bought-land-and-there-is-a-problem',
            description: 'What to do when a land purchase goes wrong.',
            searchKeywords: ['bought land', 'land purchase', 'fraud', 'double allocation', 'title problem', 'land registry'],
        },
    });
    // ─── Situations: Work & Labour ───────────────────────────────────────────────
    const sitUnpaidWages = await prisma.situation.upsert({
        where: { slug: 'my-employer-has-not-paid-me' },
        update: {},
        create: {
            categoryId: catWork.id,
            title: 'My employer has not paid me',
            slug: 'my-employer-has-not-paid-me',
            description: 'What to do when your employer withholds or delays your wages.',
            searchKeywords: ['unpaid', 'not paid', 'salary withheld', 'wages', 'employer owes me', 'payslip'],
        },
    });
    const sitDismissed = await prisma.situation.upsert({
        where: { slug: 'i-was-dismissed' },
        update: {},
        create: {
            categoryId: catWork.id,
            title: 'I was dismissed',
            slug: 'i-was-dismissed',
            description: 'Your rights when you are fired or made redundant.',
            searchKeywords: ['dismissed', 'fired', 'sacked', 'redundancy', 'termination', 'lost job'],
        },
    });
    const sitWorkplaceDispute = await prisma.situation.upsert({
        where: { slug: 'i-have-a-workplace-dispute' },
        update: {},
        create: {
            categoryId: catWork.id,
            title: 'I have a workplace dispute',
            slug: 'i-have-a-workplace-dispute',
            description: 'Resolving conflicts with your employer or colleagues.',
            searchKeywords: ['workplace dispute', 'conflict at work', 'harassment', 'grievance', 'employer dispute'],
        },
    });
    const sitDiscrimination = await prisma.situation.upsert({
        where: { slug: 'i-am-being-discriminated-against-at-work' },
        update: {},
        create: {
            categoryId: catWork.id,
            title: 'I am being discriminated against at work',
            slug: 'i-am-being-discriminated-against-at-work',
            description: 'Your rights when facing discrimination in the workplace.',
            searchKeywords: ['discrimination', 'unfair treatment', 'gender', 'tribe', 'religion', 'disability', 'work'],
        },
    });
    const sitEmploymentRights = await prisma.situation.upsert({
        where: { slug: 'i-want-to-understand-my-employment-rights' },
        update: {},
        create: {
            categoryId: catWork.id,
            title: 'I want to understand my employment rights',
            slug: 'i-want-to-understand-my-employment-rights',
            description: 'A general overview of your rights as an employee in Kenya.',
            searchKeywords: ['employment rights', 'worker rights', 'contract', 'leave', 'maternity', 'overtime'],
        },
    });
    // ─── Situations: Business & Traders ─────────────────────────────────────────
    const sitCountyOfficials = await prisma.situation.upsert({
        where: { slug: 'county-officials-are-interfering-with-my-business' },
        update: {},
        create: {
            categoryId: catBusiness.id,
            title: 'County officials are interfering with my business',
            slug: 'county-officials-are-interfering-with-my-business',
            description: 'Your rights when county government officials disrupt your business.',
            searchKeywords: ['county officials', 'county government', 'business interference', 'askari', 'harassment', 'county'],
        },
    });
    const sitGoodsConfiscated = await prisma.situation.upsert({
        where: { slug: 'my-goods-have-been-confiscated' },
        update: {},
        create: {
            categoryId: catBusiness.id,
            title: 'My goods have been confiscated',
            slug: 'my-goods-have-been-confiscated',
            description: 'What to do when your business goods are seized.',
            searchKeywords: ['goods confiscated', 'seized goods', 'stock taken', 'impounded', 'confiscated'],
        },
    });
    const sitLicenceDenied = await prisma.situation.upsert({
        where: { slug: 'i-have-been-denied-a-business-licence' },
        update: {},
        create: {
            categoryId: catBusiness.id,
            title: 'I have been denied a business licence',
            slug: 'i-have-been-denied-a-business-licence',
            description: 'Your rights when a business licence application is refused.',
            searchKeywords: ['business licence', 'permit denied', 'licence refused', 'single business permit', 'county permit'],
        },
    });
    const sitCustomerDispute = await prisma.situation.upsert({
        where: { slug: 'i-have-a-dispute-with-a-customer' },
        update: {},
        create: {
            categoryId: catBusiness.id,
            title: 'I have a dispute with a customer',
            slug: 'i-have-a-dispute-with-a-customer',
            description: 'Resolving disputes between traders and their customers.',
            searchKeywords: ['customer dispute', 'refund', 'complaint', 'consumer', 'goods returned', 'payment dispute'],
        },
    });
    const sitTraderRights = await prisma.situation.upsert({
        where: { slug: 'i-want-to-understand-my-rights-as-a-trader' },
        update: {},
        create: {
            categoryId: catBusiness.id,
            title: 'I want to understand my rights as a trader',
            slug: 'i-want-to-understand-my-rights-as-a-trader',
            description: 'A general overview of rights for traders and small business owners.',
            searchKeywords: ['trader rights', 'hawker', 'jua kali', 'market', 'business rights', 'street vendor'],
        },
    });
    // ─── Link Situations to Legal Sections ──────────────────────────────────────
    const links = [
        // Police situations
        { situationId: sitArrested.id, legalSectionId: art49.id, priority: 1 },
        { situationId: sitArrested.id, legalSectionId: art49_1f.id, priority: 2 },
        { situationId: sitArrested.id, legalSectionId: art50.id, priority: 3 },
        { situationId: sitSearch.id, legalSectionId: art31.id, priority: 1 },
        { situationId: sitSearch.id, legalSectionId: art49.id, priority: 2 },
        { situationId: sitDetained.id, legalSectionId: art49.id, priority: 1 },
        { situationId: sitDetained.id, legalSectionId: art49_1f.id, priority: 2 },
        { situationId: sitQuestioned.id, legalSectionId: art49.id, priority: 1 },
        { situationId: sitQuestioned.id, legalSectionId: art50.id, priority: 2 },
        { situationId: sitPropertyTaken.id, legalSectionId: art40.id, priority: 1 },
        { situationId: sitPropertyTaken.id, legalSectionId: art31.id, priority: 2 },
        { situationId: sitMisconduct.id, legalSectionId: art49.id, priority: 1 },
        // Land situations
        { situationId: sitLandClaim.id, legalSectionId: art40.id, priority: 1 },
        { situationId: sitBoundary.id, legalSectionId: art40.id, priority: 1 },
        { situationId: sitLandlord.id, legalSectionId: art40.id, priority: 1 },
        { situationId: sitPropertyThreat.id, legalSectionId: art40.id, priority: 1 },
        { situationId: sitLandProblem.id, legalSectionId: art40.id, priority: 1 },
        // Work situations
        { situationId: sitUnpaidWages.id, legalSectionId: art41.id, priority: 1 },
        { situationId: sitUnpaidWages.id, legalSectionId: employmentSec17.id, priority: 2 },
        { situationId: sitDismissed.id, legalSectionId: art41.id, priority: 1 },
        { situationId: sitDismissed.id, legalSectionId: employmentSec45.id, priority: 2 },
        { situationId: sitWorkplaceDispute.id, legalSectionId: art41.id, priority: 1 },
        { situationId: sitDiscrimination.id, legalSectionId: art41.id, priority: 1 },
        { situationId: sitEmploymentRights.id, legalSectionId: art41.id, priority: 1 },
        { situationId: sitEmploymentRights.id, legalSectionId: employmentSec17.id, priority: 2 },
        // Business situations
        { situationId: sitCountyOfficials.id, legalSectionId: art46.id, priority: 1 },
        { situationId: sitGoodsConfiscated.id, legalSectionId: art46.id, priority: 1 },
        { situationId: sitGoodsConfiscated.id, legalSectionId: art40.id, priority: 2 },
        { situationId: sitLicenceDenied.id, legalSectionId: art46.id, priority: 1 },
        { situationId: sitCustomerDispute.id, legalSectionId: art46.id, priority: 1 },
        { situationId: sitTraderRights.id, legalSectionId: art46.id, priority: 1 },
    ];
    for (const link of links) {
        await prisma.situationLegalSection.upsert({
            where: { situationId_legalSectionId: { situationId: link.situationId, legalSectionId: link.legalSectionId } },
            update: {},
            create: link,
        });
    }
    // ─── Actions (generic, verified-content-ready) ───────────────────────────────
    const genericActions = [
        { stepNumber: 1, title: 'Understand your right', description: 'Read the relevant legal provision shown above.', warning: undefined },
        { stepNumber: 2, title: 'Keep records', description: 'Note dates, names, badge numbers, and keep any documents, photos, or receipts.', warning: undefined },
        { stepNumber: 3, title: 'Identify the right office', description: 'Find the appropriate institution — court, commission, or government body — for your situation.', warning: undefined },
        { stepNumber: 4, title: 'Seek legal help if needed', description: 'Contact a legal aid clinic, NGO, or registered advocate for advice specific to your case.', warning: 'Some situations require a qualified legal professional. Do not delay if your rights are being violated.' },
    ];
    const allSituations = [
        sitArrested, sitSearch, sitDetained, sitQuestioned, sitPropertyTaken, sitMisconduct,
        sitLandClaim, sitBoundary, sitLandlord, sitPropertyThreat, sitLandProblem,
        sitUnpaidWages, sitDismissed, sitWorkplaceDispute, sitDiscrimination, sitEmploymentRights,
        sitCountyOfficials, sitGoodsConfiscated, sitLicenceDenied, sitCustomerDispute, sitTraderRights,
    ];
    for (const sit of allSituations) {
        for (const action of genericActions) {
            const existing = await prisma.action.findFirst({
                where: { situationId: sit.id, stepNumber: action.stepNumber },
            });
            if (!existing) {
                await prisma.action.create({ data: { situationId: sit.id, ...action } });
            }
        }
    }
    // ─── Resources ───────────────────────────────────────────────────────────────
    const resources = [
        {
            name: 'Kenya National Commission on Human Rights (KNCHR)',
            type: client_1.ResourceType.GOVERNMENT,
            description: 'Independent constitutional body that promotes and protects human rights in Kenya.',
            website: 'https://www.knchr.org',
            phone: '0800 221 349',
            isActive: true,
        },
        {
            name: 'Independent Policing Oversight Authority (IPOA)',
            type: client_1.ResourceType.GOVERNMENT,
            description: 'Civilian oversight body for the National Police Service.',
            website: 'https://www.ipoa.go.ke',
            phone: '0800 722 203',
            isActive: true,
        },
        {
            name: 'National Legal Aid Service (NLAS)',
            type: client_1.ResourceType.LEGAL_AID,
            description: 'Government body providing free legal aid to persons who cannot afford legal representation.',
            website: 'https://www.legalaid.go.ke',
            phone: '0800 720 434',
            isActive: true,
        },
        {
            name: 'Law Society of Kenya (LSK)',
            type: client_1.ResourceType.LEGAL_AID,
            description: 'Professional body for advocates in Kenya. Can help you find a registered lawyer.',
            website: 'https://www.lsk.or.ke',
            phone: '+254 20 271 3765',
            isActive: true,
        },
        {
            name: 'National Land Commission (NLC)',
            type: client_1.ResourceType.GOVERNMENT,
            description: 'Constitutional commission managing public land and investigating historical land injustices.',
            website: 'https://www.landcommission.go.ke',
            isActive: true,
        },
        {
            name: 'Employment and Labour Relations Court',
            type: client_1.ResourceType.COURT,
            description: 'Specialised court handling employment and labour disputes in Kenya.',
            website: 'https://www.judiciary.go.ke',
            isActive: true,
        },
        {
            name: 'Federation of Kenya Employers (FKE)',
            type: client_1.ResourceType.NGO,
            description: 'Employer body that can assist with employment disputes and mediation.',
            website: 'https://www.fke-kenya.org',
            isActive: true,
        },
    ];
    for (const resource of resources) {
        const existing = await prisma.resource.findFirst({ where: { name: resource.name } });
        if (!existing) {
            await prisma.resource.create({ data: resource });
        }
    }
    console.log('✅ Seed complete.');
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
