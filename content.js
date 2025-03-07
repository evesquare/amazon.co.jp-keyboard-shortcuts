document.addEventListener('keydown', function(event) {
  // ⌘+K (Macの場合) または Ctrl+K (Windowsの場合) が押されたかチェック
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    // デフォルトのブラウザ動作を防止
    event.preventDefault();
    
    // 検索ボックスの要素を取得
    const searchBox = document.getElementById('twotabsearchtextbox');
    
    // 要素が存在すればフォーカスする
    if (searchBox) {
      searchBox.focus();
    } else {
    }
  }
});