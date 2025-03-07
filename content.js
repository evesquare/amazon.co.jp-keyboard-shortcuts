function detectOS() {
  // 最新のUserAgentData APIをまず試す
  if (navigator.userAgentData && navigator.userAgentData.platform) {
    const platform = navigator.userAgentData.platform.toLowerCase();
    if (platform.indexOf('mac') > -1) {
      return 'mac';
    } else if (platform.indexOf('win') > -1) {
      return 'windows';
    }
  }
  
  // UserAgentData APIが利用できない場合は非推奨のplatformにフォールバック
  if (navigator.platform) {
    const platform = navigator.platform.toLowerCase();
    if (platform.indexOf('mac') > -1) {
      return 'mac';
    } else if (platform.indexOf('win') > -1) {
      return 'windows';
    }
  }
  
  // 両方のAPIで検出できない場合はユーザーエージェント文字列をチェック
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') > -1) {
    return 'mac';
  } else if (userAgent.indexOf('win') > -1) {
    return 'windows';
  }
  
  // それでも検出できない場合はデフォルトでWindowsとして扱う
  return 'windows';
}

// 検索ボックスのプレースホルダーを変更する関数
function updateSearchBoxPlaceholder() {
  const searchBox = document.getElementById('twotabsearchtextbox');
  if (searchBox) {
    // OSに応じてプレースホルダーテキストを変更
    const os = detectOS();
    const placeholderText = os === 'mac' ? '⌘+K' : 'Win+K';
    searchBox.setAttribute('placeholder', "Amazon.co.jpを検索　" + placeholderText);
  } else {
    // 要素がまだ読み込まれていない可能性があるため、少し遅延して再試行
    setTimeout(updateSearchBoxPlaceholder, 500);
  }
}

// DOM変更を監視してプレースホルダーを更新
function setupMutationObserver() {
  const os = detectOS();
  const expectedPlaceholder = os === 'mac' ? '⌘+K' : 'Win+K';
  
  const observer = new MutationObserver(function(mutations) {
    const searchBox = document.getElementById('twotabsearchtextbox');
    if (searchBox && searchBox.getAttribute('placeholder') !== expectedPlaceholder) {
      updateSearchBoxPlaceholder();
    }
  });
  
  // body全体の変更を監視
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
}

// ページロード完了時に実行
document.addEventListener('DOMContentLoaded', function() {
  updateSearchBoxPlaceholder();
  setupMutationObserver();
});

// ページが既に読み込まれている場合にも対応
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  updateSearchBoxPlaceholder();
  setupMutationObserver();
}

document.addEventListener('keydown', function(event) {
  // ⌘+K (Macの場合) または Win+K (Windowsの場合) が押されたかチェック
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    // デフォルトのブラウザ動作を防止
    event.preventDefault();
    
    // 検索ボックスの要素を取得
    const searchBox = document.getElementById('twotabsearchtextbox');
    
    // 要素が存在すればフォーカスする
    if (searchBox) {
      searchBox.focus();
    }
  }
});