import Image from "next/image";
import styles from "../styles/page.module.css";
import Link from "next/link";

export default function Landingpage() {
  return (
    <div className={styles.fullscreen}>
       <div className={styles.shadowCircle}></div>

       <h1 className={styles.HookLine}>Wanna get hired <span className={styles.FastWord}>Fast</span> ?</h1>
       <h1 className={styles.HookLine}>Then make your CV <span className={styles.FastWord}>Fast</span> .</h1>
       <h3 className={styles.secondaryHookLine}>Build a professional CV in minutes.</h3>
       <Link style={{cursor: 'pointer'}} href="/newCV">
          <button className={styles.lTryItButton}>Try it Now</button>
       </Link>
       <br/>
       <div className={styles.featuresContainer}>
          
          <div className={styles.SimpleFeature}>
            <div className={styles.iconside}>
              <Image
                className={styles.formIcon}
                src="/form.svg"
                alt="simple form icon"
                width={50}
                height={50}
                priority/>
              </div>
            <div className={styles.textside}>
              <p className={styles.primaryFeatureLine}>Simple form-based</p>
              <p className={styles.secondaryFeatureLine}>CV-builder</p>
            </div>
          </div>
          <div className={styles.NoSignupFeature}>
            <div className={styles.iconside}>
              <Image
                className={styles.checkIcon}
                src="/circle-check.svg"
                alt="no signup icon"
                width={50}
                height={50}
                priority/>
              </div>
            <div className={styles.textside}>
              <p className={styles.primaryFeatureLine}>No Signup Required</p>
              <p className={styles.secondaryFeatureLine}>free for access</p>
            </div>
          </div>

          <div className={styles.FastFeature}>
            <div className={styles.iconside}>
              <Image
                className={styles.fileIcon}
                src="/file-down.svg"
                alt="fast export icon"
                width={50}
                height={50}
                priority/>
                </div>
            <div className={styles.textside}>
                <p className={styles.primaryFeatureLine}>Fast PDF export</p>
                <p className={styles.secondaryFeatureLine}>Career Saver</p>
            </div>
          </div>
       </div>
    </div>  
  );
}
