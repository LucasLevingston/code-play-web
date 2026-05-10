"use client";

import {
	Activity,
	AlignLeft,
	Axis3D,
	Briefcase,
	Building,
	Building2,
	Cake,
	Calendar,
	CheckCircle,
	Clock,
	CreditCard,
	Database,
	DollarSign,
	FileText,
	Fingerprint,
	Hash,
	ImageIcon,
	Lock,
	LogIn,
	Mail,
	MailCheck,
	MailOpen,
	Map as MapIcon,
	MapPin,
	MessageSquare,
	Package,
	Phone,
	PhoneCall,
	RefreshCw,
	RouteIcon as Road,
	Scale,
	ShieldCheck,
	Tag,
	Target,
	User,
	UserCheck,
	UserCog,
	Users,
} from "lucide-react";

const defaultClassName = "h-4 w-4 text-gray-500 dark:text-gray-400";

export const getIconByFormName = (name: string) => {
	switch (name) {
		case "id":
			return <Fingerprint className={defaultClassName} />;
		case "name":
			return <User className={defaultClassName} />;
		case "mothersName":
			return <User className={defaultClassName} />;
		case "description":
		case "generalDescription":
		case "regionalDescription":
			return <AlignLeft className={defaultClassName} />;
		case "email":
			return <Mail className={defaultClassName} />;
		case "password":
			return <Lock className={defaultClassName} />;
		case "confirmPassword":
			return <Lock className={defaultClassName} />;
		case "cpf":
			return <CreditCard className={defaultClassName} />;
		case "googleAccessToken":
			return <ImageIcon className={defaultClassName} />;
		case "imageUrl":
			return <ImageIcon className={defaultClassName} />;
		case "gender":
			return <Users className={defaultClassName} />;
		case "role":
			return <ShieldCheck className={defaultClassName} />;
		case "leaderId":
			return <UserCog className={defaultClassName} />;
		case "isActive":
			return <CheckCircle className={defaultClassName} />;
		case "status":
			return <CheckCircle className={defaultClassName} />;
		case "age":
			return <Clock className={defaultClassName} />;
		case "lastLogin":
			return <LogIn className={defaultClassName} />;
		case "emailVerified":
			return <MailCheck className={defaultClassName} />;
		case "birthDate":
			return <Cake className={defaultClassName} />;
		case "phone":
			return <Phone className={defaultClassName} />;
		case "profession":
			return <Briefcase className={defaultClassName} />;
		case "authDocumentUrl":
			return <FileText className={defaultClassName} />;
		case "signatureUrl":
			return <FileText className={defaultClassName} />;
		case "acceptTerms":
			return <UserCheck className={defaultClassName} />;
		case "addressId":
			return <MapPin className={defaultClassName} />;
		case "groupId":
			return <Users className={defaultClassName} />;
		case "Address.zipCode":
		case "zipCode":
			return <MapPin className={defaultClassName} />;
		case "Address.city":
		case "city":
			return <Building className={defaultClassName} />;
		case "Address.state":
		case "state":
			return <MapPin className={defaultClassName} />;
		case "Address.street":
		case "street":
			return <Road className={defaultClassName} />;
		case "Address.number":
		case "number":
			return <Hash className={defaultClassName} />;
		case "Address.neighborhood":
		case "neighborhood":
			return <MapIcon className={defaultClassName} />;
		case "Address.complement":
		case "complement":
			return <AlignLeft className={defaultClassName} />;
		case "latitude":
		case "longitude":
			return <MapPin className={defaultClassName} />;
		case "createdAt":
			return <Calendar className={defaultClassName} />;
		case "updatedAt":
			return <RefreshCw className={defaultClassName} />;
		case "title":
			return <Tag className={defaultClassName} />;
		case "date":
			return <Calendar className={defaultClassName} />;
		case "location":
			return <MapIcon className={defaultClassName} />;
		case "organizerId":
			return <UserCog className={defaultClassName} />;
		case "message":
			return <MessageSquare className={defaultClassName} />;
		case "type":
			return <Tag className={defaultClassName} />;
		case "read":
			return <MailCheck className={defaultClassName} />;
		case "action":
			return <Activity className={defaultClassName} />;
		case "objective":
			return <Target className={defaultClassName} />;
		case "product":
			return <Package className={defaultClassName} />;
		case "unity":
		case "unit":
			return <Scale className={defaultClassName} />;
		case "predictedValue":
		case "value":
		case "budget":
		case "salary":
		case "targetValue":
		case "actualValue":
			return <DollarSign className={defaultClassName} />;
		case "predictedStartsDate":
		case "predictedEndDate":
		case "startDate":
		case "endDate":
		case "hireDate":
		case "terminationDate":
			return <Calendar className={defaultClassName} />;
		case "programName":
			return <Tag className={defaultClassName} />;
		case "programType":
		case "strategicAxis":
			return <Axis3D className={defaultClassName} />;
		case "targetAudience":
		case "partiesInvolved":
			return <Users className={defaultClassName} />;
		case "prefectureName":
			return <Building className={defaultClassName} />;
		case "registrationNumber":
		case "pisNumber":
		case "contractNumber":
			return <FileText className={defaultClassName} />;
		case "jobPositionId":
			return <Briefcase className={defaultClassName} />;
		case "departmentId":
		case "headOfDepartmentId":
			return <Building2 className={defaultClassName} />;
		case "emergencyContactName":
			return <User className={defaultClassName} />;
		case "emergencyContactPhone":
		case "contactPhone":
			return <PhoneCall className={defaultClassName} />;
		case "contactEmail":
			return <MailOpen className={defaultClassName} />;
		case "measurementFrequency":
			return <Clock className={defaultClassName} />;
		case "dataSource":
			return <Database className={defaultClassName} />;
		default:
			return null;
	}
};
