# Git Komutları ve Kullanım Rehberi

---

## 🚀 Başlarken

### Yerel Depo Oluşturma ve GitHub'a Bağlama

**1. Yeni bir Git deposu başlatma:**
```bash
git init
```

**2. Dosyaları hazırlama (staging) alanına ekleme:**
```bash
# Tüm dosyaları ekle
git add .

# Belirli bir dosyayı ekle
git add dosya_adi.txt
```

**3. İlk commit'i oluşturma:**
```bash
git commit -m "İlk commit"
```

**4. GitHub'da uzak depo (remote) bağlantısı kurma:**
```bash
git remote add origin https://github.com/kullanici_adin/repo_adi.git
```

**5. Varsayılan branch'i main olarak ayarlama:**
```bash
git branch -M main
```

**6. Kodları GitHub'a gönderme (push):**
```bash
git push -u origin main
```

---

## 📝 Temel Komutlar

### Günlük İş Akışı

**1. Değişiklikleri kontrol etme:**
```bash
# Hangi dosyaların değiştiğini görme
git status
```

**2. Dosyaları staging alanına ekleme:**
```bash
# Tüm değişiklikleri ekle
git add .

# Belli bir dosyayı ekle
git add dosya.txt

# Birden fazla dosya ekle
git add dosya1.txt dosya2.txt
```

**3. Commit oluşturma:**
```bash
# Kısa mesaj ile commit
git commit -m "Commit mesajı"

# Detaylı mesaj için (editör açılır)
git commit
```

**4. GitHub'a gönderme:**
```bash
# İlk push (branch'i takip et)
git push -u origin main

# Sonraki push'lar
git push
```

**5. GitHub'dan değişiklikleri çekme:**
```bash
# Değişiklikleri indir ve birleştir
git pull

# Sadece değişiklikleri kontrol et (birleştirmeden)
git fetch
```

### Geçmişi İnceleme

**1. Commit geçmişini görme:**
```bash
# Tüm commit'leri listele
git log

# Kısa ve öz görünüm
git log --oneline

# Son 5 commit'i göster
git log -5

# Grafik şeklinde göster
git log --graph --oneline --all
```

**2. Değişiklikleri karşılaştırma:**
```bash
# Henüz stage'lenmemiş değişiklikleri göster
git diff

# Stage'lenmiş değişiklikleri göster
git diff --staged

# İki commit arasındaki farkı göster
git diff commit1 commit2
```

---

## 🔧 Sık İhtiyaç Duyulan Komutlar

### Branch (Dal) İşlemleri

**1. Branch oluşturma ve geçiş yapma:**
```bash
# Yeni branch oluştur
git branch yeni-branch

# Branch'e geçiş yap
git checkout yeni-branch

# Branch oluştur ve hemen geçiş yap
git checkout -b yeni-branch
```

**2. Branch'leri listeleme:**
```bash
# Yerel branch'leri göster
git branch

# Uzak branch'leri de göster
git branch -a
```

**3. Branch'leri birleştirme:**
```bash
# Başka bir branch'i mevcut branch'e birleştir
git merge branch-adi
```

**4. Branch'i silme:**
```bash
# Yerel branch'i sil
git branch -d branch-adi

# Zorla sil (merge edilmemiş olsa bile)
git branch -D branch-adi

# Uzak branch'i sil
git push origin --delete branch-adi
```

### Commit Düzenleme

**1. Son commit mesajını değiştirme:**
```bash
git commit --amend -m "Yeni commit mesajı"
```

**2. Son commit'e dosya ekleme (mesaj değişmeden):**
```bash
git add unutulan-dosya.txt
git commit --amend --no-edit
```

**3. Commit geri alma:**
```bash
# Son commit'i geri al (değişiklikler kalır)
git reset --soft HEAD~1

# Son commit'i geri al (değişiklikler staging'de kalır)
git reset HEAD~1

# Son commit'i tamamen geri al (değişiklikler silinir - DİKKAT!)
git reset --hard HEAD~1

# Belirli bir commit'e dön
git reset --hard commit-id
```

### Değişiklikleri Geri Alma

**1. Stage'lenmiş dosyayı geri alma:**
```bash
git reset dosya.txt
```

**2. Dosyadaki değişiklikleri geri alma:**
```bash
# Henüz commit edilmemiş değişiklikleri sil (DİKKAT!)
git checkout -- dosya.txt

# Tüm değişiklikleri geri al
git checkout -- .
```

**3. Belirli bir commit'i geri alma (yeni commit ile):**
```bash
git revert commit-id
```

### Geçici Değişiklikler (Stash)

**1. Değişiklikleri geçici olarak saklama:**
```bash
# Mevcut değişiklikleri sakla
git stash

# Mesaj ile sakla
git stash save "Açıklayıcı mesaj"
```

**2. Saklanan değişiklikleri geri getirme:**
```bash
# En son stash'i geri getir ve sil
git stash pop

# En son stash'i geri getir ama silme
git stash apply

# Belirli bir stash'i geri getir
git stash apply stash@{0}
```

**3. Stash listesini görme:**
```bash
git stash list
```

**4. Stash'i silme:**
```bash
# Son stash'i sil
git stash drop

# Tüm stash'leri sil
git stash clear
```

### Uzak Depo (Remote) İşlemleri

**1. Uzak depoyu görüntüleme:**
```bash
# Tüm uzak depoları listele
git remote -v
```

**2. Uzak depo ekleme:**
```bash
git remote add origin https://github.com/kullanici/repo.git
```

**3. Uzak depo URL'ini değiştirme:**
```bash
git remote set-url origin https://github.com/yeni-kullanici/yeni-repo.git
```

**4. Uzak depoyu kaldırma:**
```bash
git remote remove origin
```

### Temizlik ve Bakım

**1. Takip edilmeyen dosyaları silme:**
```bash
# Hangi dosyaların silineceğini göster (test)
git clean -n

# Dosyaları sil
git clean -f

# Klasörleri de sil
git clean -fd
```

**2. Git durumunu kontrol etme:**
```bash
# Depo bilgilerini göster
git status

# Konfigürasyonu göster
git config --list
```

---

## 🎯 Kullanışlı İpuçları

### Git Konfigürasyonu

**1. Kullanıcı bilgilerini ayarlama:**
```bash
git config --global user.name "Adın Soyadın"
git config --global user.email "email@example.com"
```

**2. Varsayılan editörü ayarlama:**
```bash
git config --global core.editor "code --wait"  # VS Code için
```

**3. Renklendirmeyi aktif etme:**
```bash
git config --global color.ui auto
```

### Takma Adlar (Aliases)

**Sık kullanılan komutlar için kısayollar:**
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
```

**Kullanımı:**
```bash
git st          # git status yerine
git co main     # git checkout main yerine
git br          # git branch yerine
git visual      # güzel log görünümü için
```

---

## ⚠️ Önemli Notlar

- **`git reset --hard`** ve **`git clean -f`** komutları dosyaları kalıcı olarak siler, dikkatli kullanın!
- Commit mesajlarınızı anlamlı ve açıklayıcı yazın
- Sık sık commit yapın, ama anlamlı noktalardan
- Push etmeden önce değişikliklerinizi gözden geçirin
- Her zaman push etmeden önce pull yapmayı unutmayın (özellikle ekip çalışmasında)

---

## 📚 Ek Kaynaklar

- [Git Resmi Dokümantasyonu](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
