import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Info, 
  Users as UsersIcon, 
  MapPin, 
  Building2, 
  Bus, 
  FileUp, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  MoreHorizontal,
  History,
  CreditCard
} from 'lucide-react';
import styles from './AddStudentPage.module.css';

// --- Validation Schema ---
const studentSchema = z.object({
  // Step 1: Admission & Personal
  admissionNumber: z.string().min(1, 'Admission Number is required'),
  admissionDate: z.string().min(1, 'Admission Date is required'),
  class: z.string().refine(val => val !== 'Select Class', 'Please select a class'),
  rollNumber: z.string().optional(),
  discountPercent: z.string().optional(),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  gender: z.string().refine(val => val !== 'Select', 'Please select a gender'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  bloodGroup: z.string().optional(),
  house: z.string().optional(),
  religion: z.string().optional(),
  category: z.string().optional(),
  caste: z.string().optional(),
  nationality: z.string().default('India'),
  rteStudent: z.string().default('NO'),
  additionalActivity: z.string().optional(),
  aadharNumber: z.string().optional(),

  // Step 2: Family Info
  hasSibling: z.boolean().default(false),
  fatherName: z.string().optional(),
  fatherPhone: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherName: z.string().optional(),
  motherPhone: z.string().optional(),
  motherOccupation: z.string().optional(),
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianPhone: z.string().optional(),

  // Step 3: Contact
  primaryMobile: z.string().min(10, 'Valid mobile number is required'),
  email: z.string().email().optional().or(z.literal('')),
  currentAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  
  // Files (Handled as 'any' typically in Zod for browser File objects, or custom check)
  studentPhoto: z.any().optional(),
  document: z.any().optional(),

  // Step 4: Education & Services
  previousSchoolName: z.string().optional(),
  previousClass: z.string().optional(),
  yearDue: z.string().optional(),
  yearPassed: z.string().optional(),
  lastExamPercent: z.string().optional(),
  
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNo: z.string().optional(),
  ifscCode: z.string().optional(),
  branch: z.string().optional(),

  availTransport: z.boolean().default(false),
  availHostel: z.boolean().default(false),
});

type StudentFormData = z.infer<typeof studentSchema>;

const AddStudentPage: React.FC = () => {
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
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      admissionDate: new Date().toISOString().split('T')[0],
      class: 'Select Class',
      rollNumber: 'Auto-generated',
      nationality: 'India',
      gender: 'Select',
      bloodGroup: 'Select',
      house: 'Select House',
      additionalActivity: 'None',
      religion: 'Select',
      category: 'Select',
      rteStudent: 'NO',
      hasSibling: false,
      availTransport: false,
      availHostel: false
    }
  });

  const studentPhoto = watch('studentPhoto');
  const document = watch('document');

  // Fields to validate per step
  const stepFields: Record<number, (keyof StudentFormData)[]> = {
    1: ['admissionNumber', 'admissionDate', 'class', 'firstName', 'lastName', 'gender', 'dateOfBirth'],
    2: [], // Optional fields mostly
    3: ['primaryMobile', 'email'],
    4: []
  };

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default button behavior
    const fieldsToValidate = stepFields[currentStep];
    
    // If there are no fields to validate for this step, just proceed.
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

  const onSubmit: SubmitHandler<StudentFormData> = (data) => {
    console.log('Final Validated Data:', data);
    alert('Student added successfully!');
    navigate('/students');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      navigate('/students');
    }
  };

  const steps = [
    { id: 1, label: 'Student Info', icon: User },
    { id: 2, label: 'Parents Info', icon: UsersIcon },
    { id: 3, label: 'Contact & Details', icon: MapPin },
    { id: 4, label: 'Education & More', icon: Building2 },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Add Student</h1>
          <div className={styles.breadcrumbs}>Students / Add Student</div>
        </div>
        <button type="button" className={styles.prevButton} onClick={() => navigate('/students')} style={{ gap: '8px', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
            // Note: We disable clicking future steps to enforce validation
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
        {/* Step 1: Admission & Personal */}
        {currentStep === 1 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Info size={24} />
              <h2 className={styles.sectionTitle}>Student Basic Information</h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Admission Number <span className={styles.required}>*</span></label>
                <input {...register('admissionNumber')} className={styles.input} placeholder="ADM-2025-001" />
                {errors.admissionNumber && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.admissionNumber.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Admission Date <span className={styles.required}>*</span></label>
                <input type="date" {...register('admissionDate')} className={styles.input} />
                {errors.admissionDate && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.admissionDate.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Class <span className={styles.required}>*</span></label>
                <select {...register('class')} className={styles.select}>
                  <option disabled value="Select Class">Select Class</option>
                  {[...Array(12)].map((_, i) => <option key={i} value={`Class ${i+1}`}>Class {i+1}</option>)}
                </select>
                {errors.class && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.class.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Roll Number</label>
                <input {...register('rollNumber')} className={styles.input} disabled />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Discount %</label>
                <input type="number" {...register('discountPercent')} className={styles.input} placeholder="0" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name <span className={styles.required}>*</span></label>
                <input {...register('firstName')} className={styles.input} placeholder="Enter first name" />
                {errors.firstName && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.firstName.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name <span className={styles.required}>*</span></label>
                <input {...register('lastName')} className={styles.input} placeholder="Enter last name" />
                {errors.lastName && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.lastName.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Gender <span className={styles.required}>*</span></label>
                <select {...register('gender')} className={styles.select}>
                  <option disabled value="Select">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.gender.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Date of Birth <span className={styles.required}>*</span></label>
                <input type="date" {...register('dateOfBirth')} className={styles.input} />
                {errors.dateOfBirth && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.dateOfBirth.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Blood Group</label>
                <select {...register('bloodGroup')} className={styles.select}>
                  <option>Select</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>House</label>
                <select {...register('house')} className={styles.select}>
                  <option>Select House</option>
                  <option>Red</option><option>Blue</option><option>Green</option><option>Yellow</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Religion</label>
                <select {...register('religion')} className={styles.select}>
                  <option>Select</option>
                  <option>Hinduism</option><option>Islam</option><option>Christianity</option><option>Sikhism</option><option>Other</option>
                </select>
              </div>
            </div>
            
            <div className={styles.formGrid}>
               <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select {...register('category')} className={styles.select}>
                  <option>Select</option>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Caste</label>
                <input {...register('caste')} className={styles.input} placeholder="Enter caste" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nationality</label>
                <input {...register('nationality')} className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Additional Activity</label>
                <select {...register('additionalActivity')} className={styles.select}>
                  <option>None</option><option>Sports</option><option>Music</option><option>Dance</option><option>Art</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Aadhar Number</label>
                <input {...register('aadharNumber')} className={styles.input} placeholder="0000 0000 0000" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>RTE Student</label>
                <select {...register('rteStudent')} className={styles.select}>
                  <option>NO</option><option>YES</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Family Information */}
        {currentStep === 2 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <UsersIcon size={24} />
              <h2 className={styles.sectionTitle}>Parent & Guardian Information</h2>
            </div>

            <div className={styles.siblingQuestion}>
              <input type="checkbox" id="hasSibling" {...register('hasSibling')} className={styles.checkbox} />
              <label htmlFor="hasSibling" className={styles.checkboxLabel}>Does the student have a sibling in this school?</label>
            </div>

            {/* Father */}
            <div className={styles.guardianSection}>
              <div className={styles.guardianHeader}>
                <h3 className={styles.guardianTitle}><User size={18} /> Father Details</h3>
                <span className={styles.setPrimary}>Primary Contact</span>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}><label className={styles.label}>Name</label><input {...register('fatherName')} className={styles.input} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Phone</label><input {...register('fatherPhone')} className={styles.input} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Occupation</label><input {...register('fatherOccupation')} className={styles.input} /></div>
              </div>
            </div>

            {/* Mother */}
            <div className={styles.guardianSection}>
              <div className={styles.guardianHeader}>
                <h3 className={styles.guardianTitle}><User size={18} /> Mother Details</h3>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}><label className={styles.label}>Name</label><input {...register('motherName')} className={styles.input} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Phone</label><input {...register('motherPhone')} className={styles.input} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Occupation</label><input {...register('motherOccupation')} className={styles.input} /></div>
              </div>
            </div>

            {/* Guardian */}
            <div className={styles.guardianSection}>
              <div className={styles.guardianHeader}>
                <h3 className={styles.guardianTitle}><MoreHorizontal size={18} /> Other Guardian</h3>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}><label className={styles.label}>Name</label><input {...register('guardianName')} className={styles.input} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Relation</label><input {...register('guardianRelation')} className={styles.input} placeholder="e.g. Grandfather" /></div>
                <div className={styles.formGroup}><label className={styles.label}>Phone</label><input {...register('guardianPhone')} className={styles.input} /></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Address & Documents */}
        {currentStep === 3 && (
          <div className={styles.section}>
             <div className={styles.sectionHeader}>
              <MapPin size={24} />
              <h2 className={styles.sectionTitle}>Contact & Address</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}><Phone size={14} /> Primary Mobile <span className={styles.required}>*</span></label>
                <input {...register('primaryMobile')} className={styles.input} />
                {errors.primaryMobile && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.primaryMobile.message?.toString()}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}><Mail size={14} /> Email</label>
                <input type="email" {...register('email')} className={styles.input} />
                {errors.email && <span className={styles.errorText} style={{ color: 'red', fontSize: '12px' }}>{errors.email.message?.toString()}</span>}
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`} style={{ marginBottom: '24px' }}>
              <label className={styles.label}>Current Address</label>
              <textarea {...register('currentAddress')} className={styles.textarea} placeholder="Full street address..." />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label className={styles.label}>City</label><input {...register('city')} className={styles.input} /></div>
              <div className={styles.formGroup}><label className={styles.label}>State</label><input {...register('state')} className={styles.input} /></div>
              <div className={styles.formGroup}><label className={styles.label}>Zip Code</label><input {...register('zipCode')} className={styles.input} /></div>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '32px', borderBottom: '1px solid #f4f7fe' }}>
              <FileUp size={24} />
              <h2 className={styles.sectionTitle}>Documents & Media</h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Student Photo</label>
                <div className={styles.fileInputWrapper}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className={styles.fileInput} 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue('studentPhoto', file);
                    }} 
                  />
                  <div className={styles.customFileBtn}>
                    <FileUp size={18} /> {studentPhoto ? (studentPhoto as File).name : 'Click to upload photo'}
                  </div>
                </div>
                <span className={styles.helpText}>Max size: 2MB (JPG, PNG)</span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Birth Certificate / Document</label>
                <div className={styles.fileInputWrapper}>
                  <input 
                    type="file" 
                    accept=".pdf,.jpg,.png" 
                    className={styles.fileInput}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue('document', file);
                    }} 
                  />
                  <div className={styles.customFileBtn}>
                    <FileUp size={18} /> {document ? (document as File).name : 'Click to upload document'}
                  </div>
                </div>
                <span className={styles.helpText}>Max size: 5MB (PDF, JPG)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Previous School, Bank & Services */}
        {currentStep === 4 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <History size={24} />
              <h2 className={styles.sectionTitle}>Previous Education & Background</h2>
            </div>

            <h3 className={styles.guardianTitle} style={{ marginBottom: '20px' }}>Previous Education History</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label className={styles.label}>School Name</label><input {...register('previousSchoolName')} className={styles.input} placeholder="Enter school name" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Previous Class</label><input {...register('previousClass')} className={styles.input} placeholder="e.g. Class 5" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Year Due</label><input {...register('yearDue')} className={styles.input} placeholder="e.g. 2024" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Year Passed</label><input {...register('yearPassed')} className={styles.input} placeholder="e.g. 2024" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Last Exam %</label><input {...register('lastExamPercent')} className={styles.input} placeholder="e.g. 85%" /></div>
            </div>

            <h3 className={styles.guardianTitle} style={{ margin: '32px 0 20px' }}><CreditCard size={18} /> Bank Information</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label className={styles.label}>Bank Name</label><input {...register('bankName')} className={styles.input} placeholder="Enter bank name" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Account Name</label><input {...register('accountName')} className={styles.input} placeholder="Account holder name" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Account Number</label><input {...register('accountNo')} className={styles.input} placeholder="Enter account number" /></div>
              <div className={styles.formGroup}><label className={styles.label}>IFSC Code</label><input {...register('ifscCode')} className={styles.input} placeholder="e.g. HDFC0001234" /></div>
              <div className={styles.formGroup}><label className={styles.label}>Branch</label><input {...register('branch')} className={styles.input} placeholder="Enter branch name" /></div>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '32px' }}>
              <Bus size={24} />
              <h2 className={styles.sectionTitle}>Extra Services</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.siblingQuestion}>
                <input type="checkbox" id="availTransport" {...register('availTransport')} className={styles.checkbox} />
                <label htmlFor="availTransport" className={styles.checkboxLabel}>Avail Transport?</label>
              </div>
              <div className={styles.siblingQuestion}>
                <input type="checkbox" id="availHostel" {...register('availHostel')} className={styles.checkbox} />
                <label htmlFor="availHostel" className={styles.checkboxLabel}>Avail Hostel?</label>
              </div>
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
                <Save size={20} /> Save Student
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudentPage;
