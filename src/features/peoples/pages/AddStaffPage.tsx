import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Info, 
  MapPin, 
  Users, 
  Briefcase, 
  Building2, 
  Share2, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  FileUp,
  User
} from 'lucide-react';
import styles from './AddStaffPage.module.css';

// --- Validation Schema ---
const staffSchema = z.object({
  // Step 1: Personal Information
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().optional(),
  aadharNumber: z.string().optional(),
  gender: z.string().refine(val => val !== 'Select', 'Please select a gender'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  primaryContact: z.string().min(10, 'Valid contact number is required'),
  emailAddress: z.string().email().optional().or(z.literal('')),
  dateOfJoining: z.string().min(1, 'Date of Joining is required'),
  bloodGroup: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  maritalStatus: z.string().optional(),
  staffImage: z.any().optional(),

  // Step 2: Professional & Address
  qualification: z.string().optional(),
  professionalQualification: z.string().optional(),
  workExperience: z.string().optional(),
  resume: z.any().optional(),
  
  // Permanent Address
  permAddressLine1: z.string().optional(),
  permCity: z.string().optional(),
  permState: z.string().optional(),
  permPostalCode: z.string().optional(),
  permCountry: z.string().default('India'),

  // Current Address
  currAddressLine1: z.string().optional(),
  currCity: z.string().optional(),
  currState: z.string().optional(),
  currPostalCode: z.string().optional(),
  currCountry: z.string().default('India'),

  // Step 3: Payroll & Bank
  epfNo: z.string().optional(),
  basicSalary: z.string().optional(),
  contractType: z.string().default('Permanent'),
  contractStart: z.string().optional(),
  contractEnd: z.string().optional(),
  
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  bankName: z.string().optional(),
  ifscCode: z.string().optional(),
  branchName: z.string().optional(),

  // Step 4: Social & Notes
  facebookUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  notes: z.string().optional(),
});

type StaffFormData = z.infer<typeof staffSchema>;

const AddStaffPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      gender: 'Select',
      contractType: 'Permanent',
      bloodGroup: 'Select',
      maritalStatus: 'Select',
      permCountry: 'India',
      currCountry: 'India',
      dateOfJoining: new Date().toISOString().split('T')[0]
    }
  });

  const staffImage = watch('staffImage');
  const resume = watch('resume');

  // Fields to validate per step
  const stepFields: Record<number, (keyof StaffFormData)[]> = {
    1: ['firstName', 'gender', 'dateOfBirth', 'primaryContact', 'dateOfJoining'],
    2: [],
    3: [],
    4: []
  };

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    const fieldsToValidate = stepFields[currentStep];
    
    if (!fieldsToValidate || fieldsToValidate.length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
      return;
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit: SubmitHandler<StaffFormData> = (data) => {
    console.log('Final Validated Staff Data:', data);
    alert('Staff member added successfully!');
    navigate('/staff');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      navigate('/staff');
    }
  };

  const steps = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Professional & Address', icon: MapPin },
    { id: 3, label: 'Payroll & Bank', icon: Briefcase },
    { id: 4, label: 'Social & Other', icon: Share2 },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Add Staff</h1>
          <div className={styles.breadcrumbs}>Staff / Add Staff</div>
        </div>
        <button type="button" className={styles.prevButton} onClick={() => navigate('/staff')}>
          <ArrowLeft size={18} /> Back to List
        </button>
      </div>

      {/* Modern Stepper */}
      <div className={styles.stepper}>
        <div className={styles.stepperLine}>
          <div 
            className={styles.stepperLineProgress} 
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`${styles.step} ${currentStep === step.id ? styles.stepActive : ''} ${currentStep > step.id ? styles.stepCompleted : ''}`}
            onClick={() => currentStep > step.id && setCurrentStep(step.id)}
            style={{ cursor: currentStep > step.id ? 'pointer' : 'default' }}
          >
            <div className={styles.stepIcon}>
              {currentStep > step.id ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Info size={24} />
              <h2 className={styles.sectionTitle}>Personal Information</h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name <span className={styles.required}>*</span></label>
                <input {...register('firstName')} className={styles.input} placeholder="Enter first name" />
                {errors.firstName && <span className={styles.errorText}>{errors.firstName.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input {...register('lastName')} className={styles.input} placeholder="Enter last name" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Gender <span className={styles.required}>*</span></label>
                <select {...register('gender')} className={styles.select}>
                  <option disabled value="Select">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <span className={styles.errorText}>{errors.gender.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Date of Birth <span className={styles.required}>*</span></label>
                <input type="date" {...register('dateOfBirth')} className={styles.input} />
                {errors.dateOfBirth && <span className={styles.errorText}>{errors.dateOfBirth.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Number <span className={styles.required}>*</span></label>
                <input {...register('primaryContact')} className={styles.input} placeholder="Enter phone number" />
                {errors.primaryContact && <span className={styles.errorText}>{errors.primaryContact.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input type="email" {...register('emailAddress')} className={styles.input} placeholder="Enter email" />
                {errors.emailAddress && <span className={styles.errorText}>{errors.emailAddress.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Date of Joining <span className={styles.required}>*</span></label>
                <input type="date" {...register('dateOfJoining')} className={styles.input} />
                {errors.dateOfJoining && <span className={styles.errorText}>{errors.dateOfJoining.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Aadhar Number</label>
                <input {...register('aadharNumber')} className={styles.input} placeholder="Enter Aadhar" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Blood Group</label>
                <select {...register('bloodGroup')} className={styles.select}>
                  <option value="Select">Select</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Marital Status</label>
                <select {...register('maritalStatus')} className={styles.select}>
                  <option value="Select">Select</option>
                  <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Father's Name</label>
                <input {...register('fatherName')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Mother's Name</label>
                <input {...register('motherName')} className={styles.input} />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Staff Photo</label>
              <div className={styles.fileInputWrapper}>
                <input 
                  type="file" 
                  accept="image/*" 
                  className={styles.fileInput} 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setValue('staffImage', file);
                  }} 
                />
                <div className={styles.customFileBtn}>
                  <FileUp size={18} /> {staffImage ? (staffImage as File).name : 'Click to upload photo'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Professional & Address */}
        {currentStep === 2 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Briefcase size={24} />
              <h2 className={styles.sectionTitle}>Professional & Address Details</h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Qualification</label>
                <input {...register('qualification')} className={styles.input} placeholder="e.g. B.Ed, M.Sc" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Professional Qualification</label>
                <input {...register('professionalQualification')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Work Experience</label>
                <input {...register('workExperience')} className={styles.input} placeholder="e.g. 5 Years" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                 <label className={styles.label}>Resume (PDF)</label>
                 <div className={styles.fileInputWrapper}>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className={styles.fileInput} 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue('resume', file);
                    }} 
                  />
                  <div className={styles.customFileBtn}>
                    <FileUp size={18} /> {resume ? (resume as File).name : 'Click to upload Resume'}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '32px', borderBottom: '1px solid #f4f7fe' }}>
              <MapPin size={24} />
              <h2 className={styles.sectionTitle}>Permanent Address</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Address</label>
                <input {...register('permAddressLine1')} className={styles.input} placeholder="Street address" />
              </div>
              <div className={styles.formGroup}><label className={styles.label}>City</label><input {...register('permCity')} className={styles.input} /></div>
              <div className={styles.formGroup}><label className={styles.label}>State</label><input {...register('permState')} className={styles.input} /></div>
              <div className={styles.formGroup}><label className={styles.label}>Postal Code</label><input {...register('permPostalCode')} className={styles.input} /></div>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '32px', borderBottom: '1px solid #f4f7fe' }}>
              <MapPin size={24} />
              <h2 className={styles.sectionTitle}>Current Address</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Address</label>
                <input {...register('currAddressLine1')} className={styles.input} placeholder="Street address" />
              </div>
              <div className={styles.formGroup}><label className={styles.label}>City</label><input {...register('currCity')} className={styles.input} /></div>
              <div className={styles.formGroup}><label className={styles.label}>State</label><input {...register('currState')} className={styles.input} /></div>
              <div className={styles.formGroup}><label className={styles.label}>Postal Code</label><input {...register('currPostalCode')} className={styles.input} /></div>
            </div>
          </div>
        )}

        {/* Step 3: Payroll & Bank */}
        {currentStep === 3 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Building2 size={24} />
              <h2 className={styles.sectionTitle}>Payroll & Bank Information</h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>EPF No</label>
                <input {...register('epfNo')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Basic Salary</label>
                <input {...register('basicSalary')} className={styles.input} placeholder="0.00" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contract Type</label>
                <select {...register('contractType')} className={styles.select}>
                  <option>Permanent</option>
                  <option>Probation</option>
                  <option>Contract</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contract Start</label>
                <input type="date" {...register('contractStart')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contract End</label>
                <input type="date" {...register('contractEnd')} className={styles.input} />
              </div>
            </div>

            <h3 className={styles.guardianTitle} style={{ margin: '24px 0 16px' }}>Bank Account Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Bank Name</label>
                <input {...register('bankName')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Account Name</label>
                <input {...register('accountName')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Account Number</label>
                <input {...register('accountNumber')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>IFSC Code</label>
                <input {...register('ifscCode')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Branch</label>
                <input {...register('branchName')} className={styles.input} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Social & Notes */}
        {currentStep === 4 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Share2 size={24} />
              <h2 className={styles.sectionTitle}>Social Media & Notes</h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Facebook URL</label>
                <input {...register('facebookUrl')} className={styles.input} placeholder="https://facebook.com/..." />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Twitter URL</label>
                <input {...register('twitterUrl')} className={styles.input} placeholder="https://twitter.com/..." />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>LinkedIn URL</label>
                <input {...register('linkedinUrl')} className={styles.input} placeholder="https://linkedin.com/..." />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Instagram URL</label>
                <input {...register('instagramUrl')} className={styles.input} placeholder="https://instagram.com/..." />
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Notes / Remarks</label>
              <textarea {...register('notes')} className={styles.textarea} placeholder="Any additional notes..." />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <div className={styles.leftActions}>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          </div>
          <div className={styles.rightActions}>
            {currentStep > 1 && (
              <button type="button" className={styles.prevButton} onClick={prevStep}>
                <ChevronLeft size={20} /> Previous
              </button>
            )}
            {currentStep < totalSteps ? (
              <button key="next-btn" type="button" className={styles.nextButton} onClick={nextStep}>
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button key="submit-btn" type="submit" className={styles.submitButton}>
                <Save size={20} /> Save Staff
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStaffPage;